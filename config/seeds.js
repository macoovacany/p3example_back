const db = require('./connection');
const { User, Task } = require('../models');

db.dropCollection('users');
db.dropCollection('tasks');

db.once('open', async () => {

  const pamela = await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    tasks: [],
  });

  const elijah = await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    tasks: []
  });

  console.log('users seeded');

  const eatMeatTask = await Task.create({
    name: 'Eat Meat',
    description: 'Eat cold left over stew. ',
    dependencies: [],
    owner: pamela._id
  });

  const eatPuddingTask = await Task.create({
    name: 'Eat pudding',
    description: 'A chocolate brownie base topped with a rich chocolate & orange mousse and chocolate crumb, served with a scoop of vanilla non-dairy iced dessert',
    
    dependencies: [{
      _id: eatMeatTask._id
    }],
    owner: pamela._id
  });

  await User.findOneAndUpdate({ "email": "pamela@testmail.com" },
    {
      "tasks": [
        { _id: eatMeatTask._id },
        { _id: eatPuddingTask._id }
      ]
    })

  console.log('tasks seeded');

  process.exit();
});
