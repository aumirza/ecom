import { Request, Response } from "express";
import models from "../models";

class ProductController {
  async index(req: Request, res: Response) {
    const products = await models.Product.findAll({
      include: [
        {
          model: models.Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    return res.json({
      success: true,
      products,
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const product = await models.Product.findByPk(id, {
      include: [
        {
          model: models.Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({ product });
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const { name, price, description, quantity, categoryId } = req.body;
      const product = await models.Product.findByPk(id);

      let image;
      const file = req.file;
      if (file) {
        image = file.filename;
      }

      product?.update({
        name,
        price,
        description,
        quantity,
        image,
        categoryId,
      });

      return res.json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error?.message,
      });
    }
  }

  async addProduct(req: Request, res: Response) {
    try {
      const { name, price, description, quantity, categoryId } = req.body;

      const file = req.file;
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Please add an image",
        });
      }

      // Create a new product object
      const newProduct = await models.Product.create({
        name,
        price,
        description,
        quantity,
        image: file.filename || null,
        categoryId,
      });

      // Send a response with the newly created product
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
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

export default new ProductController();
