import dotenv from "dotenv";
dotenv.config();

export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_REGION_NAME = process.env.AWS_REGION_NAME;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
export const PROJECT_ID = process.env.PROJECT_ID;