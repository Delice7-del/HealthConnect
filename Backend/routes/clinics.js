const express = require('express');
const Clinic = require('../models/Clinic');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all clinics
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type, city, emergency } = req.query;
    const query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (type) query.type = type;
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (emergency === 'true') query.emergencyServices = true;

    const skip = (page - 1) * limit;
    const clinics = await Clinic.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ featured: -1, rating: -1 });

    const total = await Clinic.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        clinics,
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
      message: 'Server error while fetching clinics'
    });
  }
});

// Get single clinic
router.get('/:id', async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    
    if (!clinic || !clinic.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Clinic not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { clinic }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching clinic'
    });
  }
});

// Create clinic (Admin/Healthcare Provider only)
router.post('/', authenticateToken, authorize('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Clinic created successfully',
      data: { clinic }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while creating clinic'
    });
  }
});

// Update clinic
router.put('/:id', authenticateToken, authorize('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clinic) {
      return res.status(404).json({
        status: 'error',
        message: 'Clinic not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Clinic updated successfully',
      data: { clinic }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating clinic'
    });
  }
});

// Add review to clinic
router.post('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        status: 'error',
        message: 'Clinic not found'
      });
    }

    clinic.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    // Update average rating
    const totalRating = clinic.reviews.reduce((sum, review) => sum + review.rating, 0);
    clinic.rating.average = totalRating / clinic.reviews.length;
    clinic.rating.count = clinic.reviews.length;

    await clinic.save();

    res.status(200).json({
      status: 'success',
      message: 'Review added successfully',
      data: { clinic }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while adding review'
    });
  }
});

module.exports = router; 