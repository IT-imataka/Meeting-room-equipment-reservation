import express from "express";
import cors from "cors";
import homeRouter from "./routes/homeRoutes";

const app = express();
const port = 3000;

app.use(cors());
// ここでミドルウェアを定義することで、クライアントから来たリクエストをexpressがjsonと判断し、それをparseしてhttp bodyに引っ付ける
// ここのミドルウェアがなければ、クライアントから送られたどんなデータもただの文字列としか解釈されない
app.use(express.json());
app.use(homeRouter);

app.listen(port, () => {
  console.log(`サーバー起動：http://localhost:${port}`);
});
