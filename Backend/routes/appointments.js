const express = require('express');
const Appointment = require('../models/Appointment');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all appointments (Admin)
router.get('/all', authenticateToken, authorize('admin'), async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email')
            .populate('doctor', 'name email specialization');
        res.status(200).json({ status: 'success', data: { appointments } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Get user/doctor appointments
router.get('/my', authenticateToken, async (req, res) => {
    try {
        const query = req.user.role === 'doctor' ? { doctor: req.user._id } : { patient: req.user._id };
        const appointments = await Appointment.find(query)
            .populate(req.user.role === 'doctor' ? 'patient' : 'doctor', 'name email specialization doctorDetails')
            .sort({ date: 1, time: 1 });
        res.status(200).json({ status: 'success', data: { appointments } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Create appointment (Patient)
router.post('/book', authenticateToken, authorize('patient'), async (req, res) => {
    try {
        const appointmentData = { ...req.body, patient: req.user._id };
        const appointment = await Appointment.create(appointmentData);
        res.status(201).json({ status: 'success', data: { appointment } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Update appointment status (Doctor/Admin/Patient for cancel)
router.put('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status, cancellationReason } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ status: 'error', message: 'Appointment not found' });
        }

        // Role-based restrictions
        if (req.user.role === 'patient' && status !== 'canceled') {
            return res.status(403).json({ status: 'error', message: 'Not authorized' });
        }

        appointment.status = status;
        if (status === 'canceled') {
            appointment.canceledBy = req.user.role;
            appointment.cancellationReason = cancellationReason;
        }

        await appointment.save();
        res.status(200).json({ status: 'success', data: { appointment } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
