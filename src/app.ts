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
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

/**
 * API routes.
 */
app.get("/api/status", apiController.getStatus);
app.post("/api/mop", apiController.setMopMode);
app.post("/api/sweep", apiController.setMaxMode);

export default app;