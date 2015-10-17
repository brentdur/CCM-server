
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BroadcastSchema = new Schema({
  recepients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
  title: {type: String},
  message: {type: String},
  isNotification: {type: Boolean, default: false},
  isMessage: {type: Boolean, default: false},
  syncs: [{type: String, enum: 'events','messages','talks','groups','locations','topics','signups', 'conversations', 'broadcasts','all']}],
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type: Number, default: 0, required:true}
});

module.exports = mongoose.model('Broadcast', BroadcastSchema);

