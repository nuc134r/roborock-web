"use strict";

import { Response, Request, NextFunction } from "express";
import { Robot } from "./../RobotManager";
import { VacuumMode } from "../models/VacuumMode";

// API methods

export let getStatus = async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.getStatus());

export let setMopMode = async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.setMode(VacuumMode.Mop));

export let setMaxMode = async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.setMode(VacuumMode.Max));



async function RunAndSendResultAsJson(res: Response, promise: Promise<any>) {
    try {
        res.json(await promise);
    } catch (error) {
        res.status(400);
        res.send(JSON.stringify(error));
    }
}