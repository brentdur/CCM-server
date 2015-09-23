
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConversationSchema = new Schema ({
  subject: {type: String, required:true},
  alive: {type: Boolean, default: true},
  minister: {
    alive: {type: Boolean, default: true},
    readLast: {type: Boolean, default:false},
    isAnon: {type: Boolean, default:false},
    senderId: {type: String, required:true}
  },
  participant: {
    alive: {type: Boolean, default: true},
    readLast: {type: Boolean, default:true},
    isAnon: {type: Boolean, required:true, default:false},
    senderId: {type: String, required:true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
  singleton :{type: Boolean, default:false},
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
