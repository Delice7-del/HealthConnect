const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Please provide an appointment date']
    },
    time: {
        type: String,
        required: [true, 'Please provide an appointment time']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled', 'completed'],
        default: 'pending'
    },
    reason: {
        type: String,
        required: [true, 'Please provide a reason for the appointment']
    },
    notes: String,
    canceledBy: {
        type: String,
        enum: ['patient', 'doctor', 'admin']
    },
    cancellationReason: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
