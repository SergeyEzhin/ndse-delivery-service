const ChatModel = require('../models/Chat');
const { Message } = require("../models");
const { EventEmitter } = require("events");

class Chat {
    find(users) {
        return new Promise((resolve, reject) => {
            if (users && users.length === 2) {
                const chat = ChatModel.findOne({users: users});

                if (chat) {
                    resolve(chat);
                } else {
                    resolve(null);
                }
            } else {
                reject('Incorrect data');
            }
        });
    }

    sendMessage(data) {
        const { author, receiver, text } = data;

        return new Promise((resolve, reject) => {
            if(author && receiver && text) {
                const chat = ChatModel.findOne({users: [author, receiver]});
                const newMessage = new Message({
                    author,
                    sentAt: Date.now(),
                    text
                });

                if(chat) {
                    chat.updateOne({messages: [...chat.messages, newMessage]});
                } else {
                    const newChat = ChatModel({
                        users: [author, receiver],
                        createdAt: Date.now(),
                        messages: [newMessage]
                    });

                    newChat.save();
                }

                resolve(newMessage);
            } else {
                reject('Incorrect data');
            }
        });
    }

    subscribe(callback) {

    }

    getHistory(id) {
        return new Promise((resolve, reject) => {
            if(id) {
                const messagesChat = ChatModel.findOne({_id: id}, {messages: 1});

                if(messagesChat) {
                    resolve(messagesChat);
                } else {
                    resolve('Chat not found');
                }
            } else {
                reject('Incorrect data');
            }
        });
    }
}

module.exports = new Chat();