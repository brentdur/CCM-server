
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: {type: String, required: true},
  isAnon: {type: Boolean, default: false},
  version: {type:Number, default: 0}
})

TopicSchema.method.addVersion = function(cb){
	this.version = this.version + 1;
	this.save(cb);
}



module.exports = mongoose.model('Topic', TopicSchema);

