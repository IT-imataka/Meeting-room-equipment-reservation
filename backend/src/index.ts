import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

app.listen(port, () => {
  console.log(`サーバー起動：http://localhost:${port}`);
});
