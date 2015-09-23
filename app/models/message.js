// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MsgSchema = new Schema({
  from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  simpleTo: {type: String},
  simpleFrom: {type: String},
  date: {type: Date, required: true},
  subject: {type: String, required: true},
  message: {type: String, required: true},
  topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
  version: {type: Number, default: 0},
  conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'},
  senderId: {type: String}
})

MsgSchema.set('toObject', {
   virtuals: true
});



module.exports = mongoose.model('Message', MsgSchema);

