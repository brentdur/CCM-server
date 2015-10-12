
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConversationSchema = new Schema ({
  subject: {type: String},
  alive: {type: Boolean, default: true},
  minister: {
    alive: {type: Boolean, default: true},
    responded: {type: Boolean, default:false},
    isAnon: {type: Boolean, default:false},
    senderId: {type: String}
  },
  participant: {
    alive: {type: Boolean, default: true},
    responded: {type: Boolean, default:true},
    isAnon: {type: Boolean, default:false},
    senderId: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
  singleton :{type: Boolean, default:false},
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

ConversationSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    if (ret.participant.isAnon){
      delete ret.participant.user;
    }
    return ret;
  }
});

ConversationSchema.methods = {
  addMessage: function(id, cb){
    this.messages.push(id);
    this.save(cb);
  },

  killMinister: function(cb){
    this.minister.alive = false;
    this.save(cb);
  },

  killParticipant: function(cb){
    this.participant.alive = false;
    this.save(cb);
  },

  killConvo: function(cb){
    this.alive = false;
    this.save(cb);
  }
};

module.exports = mongoose.model('Conversation', ConversationSchema);
