// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  location: String,
  date: Date,
  description: String,
  lat: Number,
  lng: Number,
  version: {type:Number, default: 0},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

EventSchema.virtual('to').get(function(){
	return new Date(this.date - Date.now()).getTime()/1000;
});


EventSchema.set('toObject', {
   virtuals: true
});

EventSchema.method.addVersion = function(cb){
	this.version = this.version + 1;
	this.save(cb);
}



module.exports = mongoose.model('Event', EventSchema);

