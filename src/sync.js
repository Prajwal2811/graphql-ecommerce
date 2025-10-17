require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const User = require('./modules/users/model')(sequelize);
const Product = require('./modules/products/model')(sequelize);

Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced!');
  process.exit();
});
