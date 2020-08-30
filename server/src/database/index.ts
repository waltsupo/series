import Sequelize from 'sequelize';

import user from './user';

let sequelize: Sequelize.Sequelize;

try {
  sequelize = new Sequelize.Sequelize(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgresql:5432/${process.env.POSTGRES_DB}`
  );
} catch (error) {
  console.log(error);
  process.exit(1);
}

const db = {
  User: user(sequelize),
  sequelize
};

sequelize.sync({ force: true });

export default db;
