// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MsgSchema = new Schema({
  from: String,
  to: String,
  date: Date,
  subject: String,
  message: String
})

MsgSchema.set('toObject', {
   virtuals: true
});



module.exports = mongoose.model('Message', MsgSchema);

