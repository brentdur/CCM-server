
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BroadcastSchema = new Schema({
  recepients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
  title: {type: String, required: true},
  message: {type: String, required: true},
  isNotification: {type: Boolean, default: false},
  syncs: {type: String, enum: ['all', 'events', 'convos', 'signups', 'messages', 'talks']},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Broadcast', BroadcastSchema);

