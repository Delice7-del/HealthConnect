const express = require('express');
const HealthResource = require('../models/HealthResource');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all resources (Public)
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        const query = { status: 'published' };
        if (category) query.category = category;
        if (search) query.$text = { $search: search };

        const resources = await HealthResource.find(query)
            .populate('author', 'name role')
            .sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: { resources } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Create resource (Admin/Doctor)
router.post('/', authenticateToken, authorize('admin', 'doctor'), async (req, res) => {
    try {
        const resource = await HealthResource.create({ ...req.body, author: req.user._id });
        res.status(201).json({ status: 'success', data: { resource } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Update resource (Admin or Author)
router.put('/:id', authenticateToken, authorize('admin', 'doctor'), async (req, res) => {
    try {
        const resource = await HealthResource.findById(req.params.id);
        if (!resource) return res.status(404).json({ status: 'error', message: 'Resource not found' });

        if (req.user.role !== 'admin' && resource.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ status: 'error', message: 'Not authorized' });
        }

        Object.assign(resource, req.body);
        await resource.save();
        res.status(200).json({ status: 'success', data: { resource } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
