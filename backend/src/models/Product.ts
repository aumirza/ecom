import { DataTypes, Model, Sequelize } from "sequelize";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public quantity!: number;
  public price!: number;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(db: Sequelize) {
    return Product.init(
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
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: false,
          get() {
            const image = this.getDataValue("image");
            if (!image) return "";
            return `${process.env.API_URL}/image/${image}`;
          },
        },
      },
      {
        tableName: "products",
        sequelize: db, // this bit is important
      }
    );
  }

  public static associate(models: any) {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  }
}

export default Product;
