// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MsgSchema = new Schema({
  from: String,
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  date: Date,
  subject: String,
  message: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type: Number, default: 0}
})

MsgSchema.set('toObject', {
   virtuals: true
});



module.exports = mongoose.model('Message', MsgSchema);

