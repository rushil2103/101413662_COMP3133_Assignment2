const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const userResolver = {
  Query: {
    async login(_, { username, email, password }) {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) throw new Error("User not found!");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password!");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    }
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user: newUser };
    }
  }
};

module.exports = userResolver;
