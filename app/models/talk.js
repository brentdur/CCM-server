// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TalkSchema = new Schema({
  author: String,
  subject: String,
  date: Date,
  reference: String,
  outline: [String],
  version: {type: Number, default: 0}
})

TalkSchema.set('toObject', {
   virtuals: true
});

TalkSchema.methods.addNote = function(note, cb){
	this.outline.push(note);
	this.save(cb);
}



module.exports = mongoose.model('Talk', TalkSchema);

