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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: "user" }
  );

  return User;
};
