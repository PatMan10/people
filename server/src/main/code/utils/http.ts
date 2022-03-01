import {Response} from "express";

export function respond<T>(status: number, data: T, res: Response) {
    res.set("content-type", "application/json");
    res.status(status);
    res.send(data);
}