import { Request } from "express";
import { Response } from "express";
import { findAll } from "../repositories/reservableRepositories";

// Controllers で実際のリクエストとレスポンスを捌く
export const getHome = (req: Request, res: Response) => {
  const data = findAll();
  res.json(data);
};
