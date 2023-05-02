import { DataTypes, Model, Sequelize } from "sequelize";

class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string;
  public slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(db: Sequelize) {
    return Category.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
          get() {
            const image = this.getDataValue("image");
            if (!image) return "";
            return `${process.env.API_URL}/image/${image}`;
          },
        },
        slug: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        tableName: "categories",
        sequelize: db, // this bit is important
      }
    );
  }

  static associate(models: any) {
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    });
  }

  // static async getCategories() {
  //   return await Category.findAll({
  //     include: ["products"],
  //   });
  // }

  // static async getCategoryById(id: number) {
  //   return await Category.findByPk(id, {
  //     include: ["products"],
  //   });
  // }
}

export default Category;
