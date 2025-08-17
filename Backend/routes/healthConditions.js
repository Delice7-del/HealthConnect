const express = require('express');
const HealthCondition = require('../models/HealthCondition');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all health conditions
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, featured } = req.query;
    const query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const skip = (page - 1) * limit;
    const conditions = await HealthCondition.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ featured: -1, name: 1 });

    const total = await HealthCondition.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        conditions,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching health conditions'
    });
  }
});

// Get single health condition
router.get('/:id', async (req, res) => {
  try {
    const condition = await HealthCondition.findById(req.params.id);
    
    if (!condition || !condition.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Health condition not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { condition }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching health condition'
    });
  }
});

// Create health condition (Admin only)
router.post('/', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const condition = await HealthCondition.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Health condition created successfully',
      data: { condition }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating health condition'
    });
  }
});

// Update health condition (Admin only)
router.put('/:id', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const condition = await HealthCondition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!condition) {
      return res.status(404).json({
        status: 'error',
        message: 'Health condition not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Health condition updated successfully',
      data: { condition }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating health condition'
    });
  }
});

// Delete health condition (Admin only)
router.delete('/:id', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const condition = await HealthCondition.findByIdAndDelete(req.params.id);

    if (!condition) {
      return res.status(404).json({
        status: 'error',
        message: 'Health condition not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Health condition deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while deleting health condition'
    });
  }
});

module.exports = router; 