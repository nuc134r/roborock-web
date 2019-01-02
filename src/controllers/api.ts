"use strict";

import { Response, Request, NextFunction } from "express";
import { Robot } from "./../RobotManager";

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
    res.render("api/index", {
        title: "API Examples"
    });
};

export let getStatus = async (req: Request, res: Response) => {
    try {
        const robotStatus = await Robot.getStatus();
        res.json(robotStatus);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};