// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MsgSchema = new Schema({
  from: {type: String, required: true},
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required:true},
  simpleTo: {type: String, required: true},
  date: {type: Date, required: true},
  subject: {type: String, required: true},
  message: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type: Number, default: 0}
})

MsgSchema.set('toObject', {
   virtuals: true
});



module.exports = mongoose.model('Message', MsgSchema);

