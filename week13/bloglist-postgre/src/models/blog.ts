import { DataTypes, Model } from "sequelize"
import { sequelize } from "../util/db"


class Blog extends Model {
  declare id: number
  declare author: string
  declare url: string
  declare title: string
  declare likes: number
  declare userId: number
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)

export default Blog