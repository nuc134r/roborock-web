"use strict";

import { Response, Request, NextFunction, Router } from "express";
import { Robot } from "../RobotManager";
import { VacuumMode } from "../common/VacuumMode";
import { ApiError, ApiErrorType } from "../common/ApiError";

// API methods

export let ApiRouter = Router();

ApiRouter.use((req: Request, res: Response, next: NextFunction) => {
    if (Robot == undefined) {
        res.send(new ApiError("Robot is not connected", ApiErrorType.RobotNotConnected));
    } else {
        next();
    }
});

ApiRouter.get("/status", async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.getStatus()));
ApiRouter.post("/mop", async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.setMode(VacuumMode.Mop)));
ApiRouter.post("/sweep", async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.setMode(VacuumMode.Max)));
ApiRouter.get("/find_me", async (req: Request, res: Response) => RunAndSendResultAsJson(res, Robot.findMe()));

async function RunAndSendResultAsJson(res: Response, promise: Promise<any>) {
    try {
        res.json(await promise);
    } catch (error) {
        res.send(JSON.stringify(error));
    }
}