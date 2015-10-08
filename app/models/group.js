'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: {type: String, required:true},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  writeTalks: {type:Boolean, default: false},
  writeMsgs: {type:Boolean, default: false},
  writeEvents: {type:Boolean, default: false},
  writeSignups: {type: Boolean, default: false},
  writeConversations: {type: Boolean, default: false},
  writeBroadcasts: {type: Boolean, default: false},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type:Number, default: 0}
});

GroupSchema.methods.addUser = function(id, cb){
  this.members.push(id);
  this.save(cb);
}


module.exports = mongoose.model('Group', GroupSchema);
