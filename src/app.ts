import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import path from "path";
import * as RobotManager from "./RobotManager";
import logger from "./util/logger";
import config from "./../config.json";

const deviceConfig = { address: config.vacuumAddress, token: config.vacuumToken };

RobotManager.Initialize(deviceConfig)
  .then(() => logger.info("Successfully connected to the robot"))
  .catch(err => logger.error("Error connecting to the robot: " + JSON.stringify(err)));

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as apiController from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 80);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: -1 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

/**
 * API routes.
 */
app.use("/api", apiController.ApiRouter);

export default app;