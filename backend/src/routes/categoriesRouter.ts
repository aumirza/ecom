import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { storage } from "../helpers/multer";
import multer from "multer";

const categoriesRouter = Router();

const upload = multer({ storage: storage }).single("image");

categoriesRouter.get("/", CategoryController.index);
categoriesRouter.get("/:id", CategoryController.show);
categoriesRouter.post("/", upload, CategoryController.addCategory);
categoriesRouter.put("/:id", upload, CategoryController.update);

export default categoriesRouter;
