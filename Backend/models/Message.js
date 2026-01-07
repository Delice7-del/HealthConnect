const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    content: {
        type: String,
        required: [true, 'Message content cannot be empty']
    },
    isRead: {
        type: Boolean,
        default: false
    },
    attachments: [{
        url: String,
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
