import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import models from "../models";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await models.User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Attach user to request object
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Invalid token.",
    });
  }
};
