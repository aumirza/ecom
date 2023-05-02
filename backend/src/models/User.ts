import { DataTypes, Model, Sequelize } from "sequelize";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_EXPIRES_IN, JWT_SECRET, RESET_PASSWORD_SECRET } from "../config";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public phoneNumber!: string;
  public resetToken!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "Must be a valid email address",
            },
          },
        },

        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [6, 128],
              msg: "Password must be at least 6 characters",
            },
          },
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Phone number is required",
            },
            notEmpty: {
              msg: "Phone number is required",
            },
            is: {
              args: /^\+?\d{10,14}$/, // Regular expression to match phone number format
              msg: "Phone number must be a number",
            },
          },
        },
        resetToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "users",
        sequelize, // passing the `sequelize` instance is required
      }
    );

    this.beforeCreate(async (user: User) => {
      user.password = await user.hashPassword(user.password);
    });

    this.beforeUpdate(async (user: User) => {
      user.password = await user.hashPassword(user.password);
    });

    return this;
  }

  // static associate(models: any) {
  //   User.hasMany(models.Order, {
  //     foreignKey: "userId",
  //     as: "orders",
  //   });
  //   User.hasMany(models.Cart, {
  //     foreignKey: "userId",
  //     as: "carts",
  //   });
  // }

  public generateSignedToken() {
    const id = this.id;
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  public async generateResetPasswordToken() {
    const id = this.id;
    const token = jwt.sign({ id }, RESET_PASSWORD_SECRET, {
      expiresIn: "10m",
    });
    this.resetToken = token;
    await this.save();
    return token;
  }

  public isRefreshTokenExpired() {
    // const decoded = jwt.verify(this.resetToken, RESET_PASSWORD_SECRET);
    const decoded = jwt.decode(this.resetToken);
    const expirationTime = (decoded as JwtPayload)?.exp;
    return Date.now() >= expirationTime! * 1000;
  }

  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
