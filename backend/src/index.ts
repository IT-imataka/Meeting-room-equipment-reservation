import express from "express";
import cors from "cors";
import homeRouter from "./routes/homeRoutes";
import { Server } from "node:http";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(homeRouter);

app.listen(port, () => {
  console.log(`サーバー起動：http://localhost:${port}`);
});
