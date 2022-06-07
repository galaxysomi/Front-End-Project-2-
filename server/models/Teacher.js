const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age:{
    type:Number,
    required: true
  },
  SDT:{
    type:String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    default:'teacher'
  }
});

const Teacher= mongoose.model('Teacher', UserSchema);

module.exports = Teacher;
