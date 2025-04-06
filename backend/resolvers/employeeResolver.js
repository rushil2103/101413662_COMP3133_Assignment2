const Employee = require('../models/Employee');

const employeeResolver = {
  Query: {
    employees: () => Employee.find(),
    employee: (_, { eid }) => Employee.findById(eid),
    searchEmployee: (_, { designation, department }) => 
      Employee.find({ $or: [{ designation }, { department }] })
  },
  Mutation: {
    addEmployee: (_, args) => new Employee(args).save(),
    updateEmployee: (_, { eid, ...args }) => Employee.findByIdAndUpdate(eid, args, { new: true }),
    deleteEmployee: (_, { eid }) => Employee.findByIdAndDelete(eid)
  }
};

module.exports = employeeResolver;
