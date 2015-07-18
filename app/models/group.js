'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  writeTalks: Boolean,
  writeMsgs: Boolean,
  writeEvents: Boolean,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type:Number, default: 0}
});

GroupSchema.methods.addUser = function(id, cb){
  this.members.push(id);
  this.save(cb);
}


module.exports = mongoose.model('Group', GroupSchema);
