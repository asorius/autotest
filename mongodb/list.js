const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  key: String,
  list: Array
});

module.exports = mongoose.model('carlist', schema);
