import { Request } from "express";
import { Response } from "express";

// Controllers で実際のリクエストとレスポンスを捌く
export const getHome = (req: Request, res: Response) => {
  res.send("Hello from Controller!");
};
