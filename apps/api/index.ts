import express from "express";
import { generateSlug } from "random-word-slugs";
import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { Server } from "socket.io";
import Redis from "ioredis";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = 9001;

const subscriber = new Redis();

const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    socket.join(channel);
    socket.emit("message", `Joined ${channel}`);
  });
});

io.listen(9002, {});
console.log("Socket Server running on port 9002");

const ecsClient = new ECSClient({
  region: process.env.AWS_REGION_NAME ?? "aws-region-missing",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? "aws-access-key-missing",
    secretAccessKey: process.env.AWS_SECRET_KEY ?? "aws-secret-key-missing",
  },
});

const config = {
  CLUSTER: process.env.AWS_ECS_CLUSTER_ARN,
  TASK: process.env.AWS_ECS_TASK_ARN,
};

app.use(express.json());
app.use(cors());

app.post("/project", async (req, res) => {
  const { gitURL, slug } = req.body;
  const projectSlug = slug ? slug : generateSlug();

  // Spin the container
  const command = new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: process.env.AWS_ECS_SUBNETS?.split(","),
        securityGroups: process.env.AWS_ECS_SECURTIY_GROUPS?.split(","),
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: process.env.AWS_ECS_IMAGE_NAME,
          environment: [
            { name: "GIT_REPOSITORY__URL", value: gitURL },
            { name: "PROJECT_ID", value: projectSlug },
            { name: "AWS_ACCESS_KEY", value: process.env.AWS_ACCESS_KEY },
            { name: "AWS_SECRET_KEY", value: process.env.AWS_SECRET_KEY },
            { name: "AWS_REGION_NAME", value: process.env.AWS_REGION_NAME },
            { name: "AWS_S3_BUCKET", value: process.env.AWS_S3_BUCKET },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);

  return res.json({
    status: "queued",
    data: {
      projectSlug,
      url: `http://${projectSlug}.localhost:${process.env.PROXY_PORT}`,
    },
  }); // 9000 is s3 reverse proxy port
});

async function initRedisSubscribe() {
  console.log("Subscribed to logs....");

  subscriber.psubscribe("logs:*"); // all channels starting with logs:
  subscriber.on("pmessage", (pattern, channel, message) => {
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

app.listen(PORT, () => console.log(`API Server Running..${PORT}`));
