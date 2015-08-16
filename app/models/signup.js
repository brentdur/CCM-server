
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SignupSchema = new Schema({
  name: {type: String, required: true},
  dateInfo: {type: String, required: true},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  memberCount: {type: Number, default:0},
  location: {type: String, required: true},
  address: {type: String, required: true},
  relatedEvent: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  description: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type:Number, default: 0}
})

SignupSchema.method.addVersion = function(cb){
	this.version = this.version + 1;
	this.save(cb);
}

SignupSchema.methods.addMember = function(id, cb){
  this.members.push(id);
  this.memberCount = this.memberCount + 1;
  this.version = this.version + 1;
  this.save(cb);
}

module.exports = mongoose.model('Signup', SignupSchema);

