const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    
  }
});

taskSchema.add(
  {
    dependencies: [mongoose.ObjectId]
  }
)


// check all dependencies have been completedbefore allowing task 

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
