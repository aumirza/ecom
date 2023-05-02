import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

import router from "./routes";
import path from "path";

const logger = morgan("dev");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

app.use(cors());
app.use(logger);

const imagesDir = path.join(__dirname, "../public/images");
console.log(imagesDir);

// static files
app.use("/image", express.static(imagesDir));

app.use(router);

export default app;
