// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number,
  version: {type:Number, default: 0}
})


module.exports = mongoose.model('Location', LocationSchema);