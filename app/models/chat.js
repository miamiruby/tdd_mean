let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timeout: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    archivedAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});

ChatSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('chat', ChatSchema);
