
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BroadcastSchema = new Schema({
  recepients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
  title: {type: String},
  message: {type: String},
  isNotification: {type: Boolean, default: false},
  isMessage: {type: Boolean, default: false},
  syncs: [{type: String, enum: ['all', 'events', 'convos', 'signups', 'messages', 'talks']}],
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type: Number, default: 0}
});


module.exports = mongoose.model('Broadcast', BroadcastSchema);

