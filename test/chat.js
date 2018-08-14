process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Chat = require('../app/models/chat');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Chats', () => {
    beforeEach((done) => {
        Chat.remove({}, (err) => {
            done();
        });
    });
    describe('/GET chat', () => {
        it('it should GET all the chats', (done) => {
            chai.request(server)
                .get('/chat')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST chat', () => {
        it('it should not POST a chat without pages field', (done) => {
            let chat = {
                username: "miamiruby",
                text: "Chat body....",
                timeout: 1000
            }
            chai.request(server)
                .post('/chat')
                .send(chat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a chat ', (done) => {
            let chat = {
                username: "miamiruby",
                text: "Chat body from posted chat....",
                timeout: 1000
            }
            chai.request(server)
                .post('/chat')
                .send(chat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text').eql('Chat body from posted chat....');
                    res.body.chat.should.have.property('username');
                    res.body.chat.should.have.property('timeout');
                    res.body.chat.should.have.property('createdAt');
                    done();
                });
        });
    });
    describe('/GET/:id chat', () => {
        it('it should GET a chat by the given id', (done) => {
            let chat = new Chat({
                username: "miamiruby",
                text: "Sample Chat body....",
                timeout: 1000
            });
            chat.save((err, chat) => {
                chai.request(server)
                    .get('/chat/' + chat.id)
                    .send(chat)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('username');
                        res.body.should.have.property('text');
                        res.body.should.have.property('timeout');
                        res.body.should.have.property('_id').eql(chat.id);
                        done();
                    });
            });

        });
    });
    describe('/PUT/:id chat', () => {
        it('it should UPDATE a chat given the id', (done) => {
            let chat = new Chat({
                username: "miamiruby",
                text: "Sample Chat body....",
                timeout: 1000
            })
            chat.save((err, chat) => {
                chai.request(server)
                    .put('/chat/' + chat.id)
                    .send({
                        title: "Updated Sample Chat Body....",
                        author: "miamiruby",
                        timeout: 20000
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('text').eql('Updated Sample Chat Body....');
                        res.body.chat.should.have.property('timeout').eql(20000);
                        done();
                    });
            });
        });
    });
    describe('/ARCHIVE/:id chat', () => {
        it('it should ARCHIVE a chat given the id', (done) => {
            let chat = new Chat({
                username: "miamiruby",
                text: "Sample Chat body....",
                archivedAt: new Date()
                timeout: 1000
            })
            chat.save((err, chat) => {
                chai.request(server)
                    .delete('/chat/' + chat.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql('Chat successfully archived!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});
