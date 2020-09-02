import Sequelize from "sequelize";

import user from "./user";
import episode from "./episode";

let sequelize: Sequelize.Sequelize;

try {
  sequelize = new Sequelize.Sequelize(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgresql:5432/${process.env.POSTGRES_DB}`
  );
} catch (error) {
  console.log(error);
  // Exit as there is not database connection available
  process.exit(1);
}

const db = {
  User: user(sequelize),
  Episode: episode(sequelize),
  sequelize,
};

sequelize.sync();

export default db;
