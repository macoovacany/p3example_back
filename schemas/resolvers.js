const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('tasks');
        console.log({tasks: user.tasks});

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    tasks: async (parent, args, context) => {
    // TODO: if not logged in
      const tasks = await Task.find({owner: context.user._id}).populate('dependencies');
      return tasks;
    }
  },


  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addTask: async (parent, args, {user}) => {

      const owner = await User.findOne({email: user.email});

  const newTask = await Task.create({
    ...args,
    owner: owner._id
  });

await User.findByIdAndUpdate(owner._id,
   {$push: {tasks: newTask._id}},
   {new: true});

return newTask;

}
  }
};

module.exports = resolvers;
