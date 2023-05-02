import express from "express";
import productsRouter from "./productsRouter";
import categoriesRouter from "./categoriesRouter";
import authRouter from "./authRouter";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRouter);
router.use(authMiddleware);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);

export default router;
