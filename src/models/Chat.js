const { Schema, model } = require('mongoose');
const { Message } = require('./Message');

const chatSchema = new Schema({
    users: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    messages: {
        type: [Message],
        required: false
    }
});

module.exports = model('Chat', chatSchema);