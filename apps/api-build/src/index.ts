import express from "express";

const app = express();

app.get("/", (req: any, res: any) => {
    res.send("Hello");
    return;
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
