// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TalkSchema = new Schema({
  author: {type: String, required: true},
  subject: {type: String, required: true},
  date: {type: Date, required: true},
  reference: {type: String, required: true},
  fullVerse: {type: String, required: true},
  outline: [String],
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  version: {type: Number, default: 0}
})

TalkSchema.set('toObject', {
   virtuals: true
});

TalkSchema.methods.addNote = function(note, cb){
	this.outline.push(note);
	this.save(cb);
}

TalkSchema.methods.incVersion = function(cb){
  this.version += 1;
  this.save(cb);
}



module.exports = mongoose.model('Talk', TalkSchema);

