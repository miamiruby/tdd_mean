let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let chat = require('./app/routes/chat');
let config = require('config');
let options = {
    useNewUrlParser: true,
    server: {
        useNewUrlParser: true,
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}
                                     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/json'
}));

app.get("/", (req, res) => res.json({
    message: "Under Armour Chat API!"
}));

app.route("/chat")
    .get(chat.getChats)
    .post(chat.postChat);
    
app.route("/chat/:id")
    .get(chat.getChat)
    .delete(chat.deleteChat)
    .put(chat.updateChat);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app;