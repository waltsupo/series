import Sequelize, { Model, DataTypes } from "sequelize";

class Series extends Model {
  id: number;
  name: string;
  altNames?: string;
  description?: string;
  status: "ongoing" | "finished" | "upcoming";
  coverImg?: string;
  genres?: string;
}

export default (sequelize: Sequelize.Sequelize) => {
  Series.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      altNames: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("ongoing", "finished", "upcoming"),
      },
      coverImg: {
        type: DataTypes.STRING,
      },
      genres: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: [
          "id",
          "name",
          "altNames",
          "description",
          "status",
          "coverImg",
          "genres",
        ],
      },
      sequelize,
      modelName: "series",
    }
  );

  return Series;
};
