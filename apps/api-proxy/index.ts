import express from "express";
import httpProxy from "http-proxy";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 9000;

// get this url from bucket itself -> follows format - <bucket_name>.s3.<region>.amazonaws.com/<path>
const BASE_PATH = process.env.S3_BUCKET_PATH;

const proxy = httpProxy.createProxy();

// request comes at <PROJECT_ID>.localhost:6000/index.html =>
// Migrate to s3, get index.html from folder <PROJECT_ID> in s3 and stream it back to frontend

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split(".")[0];

    // To add support for Custom Domain - DB Query to search for corresponding project id for a domain

    const resolvesTo = `${BASE_PATH}/${subdomain}`;

    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
});

proxy.on("proxyReq", (proxyReq, req, res) => {
    const url = req.url;

    // to route / to /index.html
    if (url === "/") proxyReq.path += "index.html";
});

app.listen(PORT, () => console.log(`Reverse Proxy Running..${PORT}`));
