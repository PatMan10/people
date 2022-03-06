import { Response } from "express";

export function respond<T>(status: number, body: T, res: Response) {
  res.set("content-type", "application/json");
  res.status(status);
  res.send(body);
}

