import { Request, Response } from "express";
import models from "../models";
import { slugify } from "../utils";

class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await models.Category.findAll();
    return res.json({ categories });
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const category = await models.Category.findByPk(id, {
      include: [
        {
          model: models.Product,
          as: "products",
          attributes: ["name", "price", "description", "quantity"],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.json({ category });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    let image;
    const file = req.file;
    if (file) {
      image = file.filename;
    }

    try {
      const category = await models.Category.findByPk(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      await category.update({
        name,
        description,
        image,
        slug: slugify(name),
      });

      return res.json({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    }
  }

  async addCategory(req: Request, res: Response) {
    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    try {
      // Create a new product object
      const newCategory = await models.Category.create({
        name,
        description,
        slug: slugify(name),
      });

      // Send a response with the newly created product
      res.status(201).json({
        success: true,
        message: "Category added successfully",
        category: newCategory,
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

export default new CategoryController();
