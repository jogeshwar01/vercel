import { exec } from "child_process";
import path from "path";
import fs from "fs";
import mime from "mime-types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Redis from 'ioredis';
const publisher = new Redis()
const PROJECT_ID = process.env.PROJECT_ID

async function publishLog(log) {
    try {
        const result = await publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }));
        console.log(`Publish result: ${result}`);
    } catch (error) {
        console.error(`Error publishing log: ${error}`);
    }
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION_NAME ?? "aws-region-missing",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ?? "aws-access-key-missing",
        secretAccessKey: process.env.AWS_SECRET_KEY ?? "aws-secret-key-missing",
    },
});

async function init() {
    console.log("Executing script.js");
    const __dirname = path.resolve();

    const outDirPath = path.join(__dirname, "output");

    // needed to add rm package-lock.json as git repo was corrupted, not needed otherwise, can cause issues for other repos
    const command = exec(`cd ${outDirPath} && rm package-lock.json && npm install && npm run build`);

    command.stdout?.on("data", function (data) {
        console.log(data.toString());
        publishLog(data.toString())
    });

    command.stdout?.on("error", function (data) {
        console.log(data.toString());
        publishLog(data.toString())
    });

    command.on("close", async function () {
        console.log("Build Complete");
        publishLog(`Build Complete`)

        const distFolderPath = path.join(__dirname, "output", "dist");
        const distFolderContents = fs.readdirSync(distFolderPath, {
            recursive: true,
        });

        publishLog(`Starting to upload`)
        for (const file of distFolderContents) {
            const filePath = path.join(distFolderPath, file.toString()); // toString() for buffers
            if (fs.lstatSync(filePath).isDirectory()) continue;

            console.log('uploading', filePath)
            publishLog(`uploading ${file}`)

            const command = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `__outputs/${process.env.PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath) || undefined,
            });

            await s3Client.send(command);
            publishLog(`uploaded ${file}`)
            console.log("uploaded", filePath);
        }

        publishLog(`Done`)
        console.log("Done...");
    });
}

init()