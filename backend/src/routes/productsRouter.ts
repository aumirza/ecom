import express from "express";
import ProductController from "../controllers/ProductController";
import multer from "multer";
import { storage } from "../helpers/multer";

const productsRouter = express.Router();

const upload = multer({ storage: storage }).single("image");

productsRouter.get("/", ProductController.index);
productsRouter.post("/", upload, ProductController.addProduct);
productsRouter.get("/:id", ProductController.show);
productsRouter.put("/:id", upload, ProductController.edit);

export default productsRouter;
