import Sequelize, { Model, DataTypes } from "sequelize";

class User extends Model {
  id: string;
  username: string;
}

export default (sequelize: Sequelize.Sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: ["id", "username"],
      },
      sequelize,
      modelName: "user",
    }
  );

  return User;
};
