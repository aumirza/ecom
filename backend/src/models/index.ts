import { Sequelize } from "sequelize";
import { DB_URL } from "../config";
import Category from "./Category";
import Product from "./Product";
import User from "./User";

const db = new Sequelize(DB_URL);

const models = {
  Product: Product.initialize(db),
  Category: Category.initialize(db),
  User: User.initialize(db),
};

const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

Object.keys(models).forEach((key) => {
  if ("associate" in getKeyValue(models, key as keyof typeof models)) {
    // @ts-ignore
    getKeyValue(models, key as keyof typeof models).associate(models);
  }
});

export { db };
export default models;
