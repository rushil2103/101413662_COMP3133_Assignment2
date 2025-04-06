const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const userSchema = require('./schemas/userSchema');
const employeeSchema = require('./schemas/employeeSchema');
const userResolver = require('./resolvers/userResolver');
const employeeResolver = require('./resolvers/employeeResolver');

const app = express();
connectDB();

const server = new ApolloServer({ typeDefs: [userSchema, employeeSchema], resolvers: [userResolver, employeeResolver] });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(5000, () => console.log(`Server running on port 5000`));
});
