const express = require('express');
const Message = require('../models/Message');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Send a message
router.post('/send', authenticateToken, async (req, res) => {
    try {
        const { receiver, appointment, content } = req.body;
        const message = await Message.create({
            sender: req.user._id,
            receiver,
            appointment,
            content
        });
        res.status(201).json({ status: 'success', data: { message } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Get conversation with a user
router.get('/conversation/:userId', authenticateToken, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user._id }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json({ status: 'success', data: { messages } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
