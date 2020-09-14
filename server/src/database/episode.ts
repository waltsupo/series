import Sequelize, { Model, DataTypes } from "sequelize";

class Episode extends Model {
  id: number;
  title: string;
  episodeNumber: number;
  type: "episode" | "special" | "movie";
  link: string;
  published?: Date;
}

export default (sequelize: Sequelize.Sequelize) => {
  Episode.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      episodeNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("episode", "special", "movie"),
      },
      link: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.DATE,
      },
    },
    {
      defaultScope: {
        attributes: [
          "id",
          "title",
          "episodeNumber",
          "type",
          "link",
          "published",
        ],
      },
      sequelize,
      modelName: "episode",
    }
  );

  return Episode;
};
