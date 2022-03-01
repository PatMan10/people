import { Router } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Urls, Messages } from "../utils/const";
import {respond} from "../utils/http";


const controller = Router();

controller.get(Urls.INDEX, (_req, res) => {
    respond(StatusCodes.OK, { message: Messages.success.WELCOME }, res);
});



controller.get(Urls.WILD, (_req, res) => {
    respond(StatusCodes.NOT_FOUND, { message: ReasonPhrases.NOT_FOUND }, res);
});

export default controller;
