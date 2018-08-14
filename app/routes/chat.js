let mongoose = require('mongoose');
let Chat = require('../models/chat');

function getChats(req, res) {
    let query = Chat.find({});
    query.exec((err, chats) => {
        if (err) res.send(err);
        res.json(chats);
    });
}

function postChat(req, res) {
    var newChat = new Chat(req.body);
    newChat.save((err, chat) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: "Chat successfully added!",
                chat
            });
        }
    });
}

function getChat(req, res) {
    Chat.findById(req.params.id, (err, chat) => {
        if (err) res.send(err);
        res.json(chat);
    });
}

function deleteChat(req, res) {
    Chat.remove({
        _id: req.params.id
    }, (err, result) => {
        res.json({
            message: "Chat successfully archived!",
            result
        });
    });
}

function updateChat(req, res) {
    Chat.findById({
        _id: req.params.id
    }, (err, chat) => {
        if (err) res.send(err);
        Object.assign(chat, req.body).save((err, chat) => {
            if (err) res.send(err);
            res.json({
                message: 'Chat updated!',
                chat
            });
        });
    });
}

module.exports = {
    getChats,
    postChat,
    getChat,
    deleteChat,
    updateChat
};
