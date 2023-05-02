import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
// authRouter.post("/logout", authController.logout);
// authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password/:resetToken", authController.resetPassword);

export default authRouter;
