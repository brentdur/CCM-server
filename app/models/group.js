'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

GroupSchema.methods.addUser = function(id, cb){
  this.members.push(id);
  this.save(cb);
}


module.exports = mongoose.model('Group', GroupSchema);
