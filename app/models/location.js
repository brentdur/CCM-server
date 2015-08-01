// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  version: {type:Number, default: 0}
})


module.exports = mongoose.model('Location', LocationSchema);