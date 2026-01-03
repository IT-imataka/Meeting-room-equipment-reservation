import express from "express";
import homeRouter from "./routes/homeRoutes";

const app = express();
const port = 3000;

app.use(homeRouter);

app.listen(port, () => {
  console.log(`サーバー起動：http://localhost:${port}`);
});
