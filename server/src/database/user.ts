import Sequelize, { Model, DataTypes } from 'sequelize';

class User extends Model {
  id: number;
  username: string;
  password: string;
}

export default (sequelize: Sequelize.Sequelize) => {
  User.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: ['id', 'username'],
      },
      scopes: {
        // Used for sessions and authentication
        auth: {
          attributes: ['id', 'username', 'password'],
        },
      },
      sequelize,
      modelName: 'user',
    }
  );

  return User;
};
