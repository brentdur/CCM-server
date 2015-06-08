// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  location: String,
  date: Date,
  description: String
})

EventSchema.virtual('to').get(function(){
	return new Date(this.date - Date.now()).getTime()/1000;
});

EventSchema.set('toObject', {
   virtuals: true
});



module.exports = mongoose.model('Event', EventSchema);

