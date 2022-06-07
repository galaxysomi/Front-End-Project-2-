const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  monChinh: {
    type: String,
    required: true
  },
  monDiemTam: {
    type: String,
    required: true
  },
  quaChieu: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    timestamp: true
  },
});

const FoodMenu  = mongoose.model('FoodMenu', UserSchema);

module.exports = FoodMenu;
