const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatsSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    msg : {
        type: Array,
        default: []
    }
},{ timestamps : true })


const Chats = mongoose.model('Chats', chatsSchema);

module.exports = { Chats }
