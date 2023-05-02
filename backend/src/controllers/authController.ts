import { Request, Response } from "express";
import models from "../models";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, address, phoneNumber } = req.body;
      // Check if user exists
      const userExists = await models.User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      // Create user
      const user = await models.User.create({
        name,
        email,
        password,
        address,
        phoneNumber,
      });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error?.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      // Check if user exists
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      // Check if password is correct
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      // Create token
      const token = user.generateSignedToken();
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error?.message,
      });
    }
  }
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }
      // Check if user exists
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      // Create reset token
      const resetToken = await user.generateResetPasswordToken();
      // Send email
      const resetUrl = `http://localhost:5000/auth/reset-password/${resetToken}`;
      return res.status(200).json({
        success: true,
        message: "Reset password email sent successfully",
        resetUrl,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error?.message,
      });
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      const { resetToken } = req.params;
      const { password } = req.body;
      if (!resetToken) {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }
      // check if token has expired

      // Check if user exists
      const user = await models.User.findOne({ where: { resetToken } });

      if (!user || user.isRefreshTokenExpired()) {
        return res.status(404).json({
          success: false,
          message: "Reset token invalid or has expired",
        });
      }
      // Update password
      user.password = password;
      user.resetToken = "";
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
        user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error?.message,
      });
    }
  }
}

export default new AuthController();
