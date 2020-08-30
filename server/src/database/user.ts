import Sequelize, { Model, DataTypes } from 'sequelize';

class User extends Model {
  id: string;
  username: string;
}

export default (sequelize: Sequelize.Sequelize) => {
  User.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      defaultScope: {
        attributes: ['id', 'username']
      },
      sequelize,
      modelName: 'user'
    }
  );

  return User;
};
