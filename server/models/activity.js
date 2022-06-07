const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    timestamp: true
  },
  place:{
    type: String,
    required: true
  },
  timeStart:{
    type: String,
    required: true
  },
  timeFinish:{
    type: String,
    required: true
  }
});

const Activity = mongoose.model('Activity', UserSchema);

module.exports = Activity;
