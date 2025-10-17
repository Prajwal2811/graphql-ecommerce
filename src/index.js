require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { Sequelize } = require('sequelize');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const DataLoader = require('dataloader');

// Initialize Sequelize with MySQL
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

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('MySQL Connected'))
  .catch(err => console.error('DB Connection Error:', err));

// Import models
const User = require('./modules/users/model')(sequelize);
const Product = require('./modules/products/model')(sequelize);

// Associations
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    db: sequelize,
    loaders: {
      userLoader: new DataLoader(async (ids) => {
        const users = await User.findAll({ where: { id: ids } });
        return ids.map(id => users.find(u => u.id === id));
      })
    },
    user: req.user, // optional: for auth middleware
  })
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
