import { Request, Response } from "express";

import config from "./../../config.json";
const i18n = require("./../../i18n/" + config.language);


export let index = (req: Request, res: Response) => {
    res.render("home", {
        title: "Roborock Web",
        i18n: i18n
    });
};
