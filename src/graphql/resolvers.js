const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async (_, __, { db }) => await db.models.User.findAll(),
    products: async (_, args, { db }) => {
      const where = {};
      if (args.category) where.category = args.category;
      if (args.minPrice) where.price = { [db.Sequelize.Op.gte]: args.minPrice };
      if (args.maxPrice) where.price = { ...where.price, [db.Sequelize.Op.lte]: args.maxPrice };
      return await db.models.Product.findAll({ where });
    }
  },
  Mutation: {
    register: async (_, { name, email, password, role }, { db }) => {
      const hash = await bcrypt.hash(password, 10);
      return await db.models.User.create({ name, email, password: hash, role });
    },
    login: async (_, { email, password }, { db }) => {
      const user = await db.models.User.findOne({ where: { email } });
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    },
    createProduct: async (_, { name, price, stock, category }, { db, user }) => {
      if (!user || user.role !== 'SELLER') throw new Error('Not authorized');
      return await db.models.Product.create({ name, price, stock, category, sellerId: user.id });
    }
  },
  Product: {
    seller: async (parent, _, { db, loaders }) => loaders.userLoader.load(parent.sellerId)
  }
};

module.exports = resolvers;
