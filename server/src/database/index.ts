import Sequelize from 'sequelize';

import user from './user';
import episode from './episode';
import series from './series';

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

// Due to above try-catch, we'll need to ignore few TS rules (variable used before assigned)

const db = {
  // @ts-ignore
  User: user(sequelize),
  // @ts-ignore
  Episode: episode(sequelize),
  // @ts-ignore
  Series: series(sequelize),
  // @ts-ignore
  sequelize,
};

db.Series.hasMany(db.Episode, {
  foreignKey: 'seriesId',
  onDelete: 'CASCADE',
});

db.Episode.belongsTo(db.Series);

// @ts-ignore
sequelize.sync();

export default db;
