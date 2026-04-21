const express = require('express');
const User = require('../models/User');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all doctors (Accessible by patients for booking)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('name email doctorDetails avatar status');
    res.status(200).json({
      status: 'success',
      data: { doctors }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching doctors'
    });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          preferences: user.preferences,
          healthProfile: user.healthProfile,
          emergencyContacts: user.emergencyContacts
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, preferences, healthProfile, emergencyContacts, doctorDetails } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    if (healthProfile) user.healthProfile = { ...user.healthProfile, ...healthProfile };
    if (emergencyContacts) user.emergencyContacts = emergencyContacts;
    if (doctorDetails) user.doctorDetails = { ...(user.doctorDetails?.toObject?.() || user.doctorDetails), ...doctorDetails };

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          preferences: user.preferences,
          healthProfile: user.healthProfile,
          emergencyContacts: user.emergencyContacts,
          doctorDetails: user.doctorDetails
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating profile'
    });
  }
});

// Get all users (Admin only)
router.get('/', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const query = {};

    if (role) query.role = role;
    if (search) query.$text = { $search: search };

    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        users,
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
      message: 'Server error while fetching users'
    });
  }
});

// Update user role (Admin only)
router.put('/:id/role', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;

    if (!['patient', 'doctor', 'admin'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User role updated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating user role'
    });
  }
});

// Approve doctor (Admin only)
router.put('/:id/approve', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== 'doctor') {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor not found'
      });
    }

    user.status = 'active'; // or 'approved' depending on your model enum
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Doctor approved successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while approving doctor'
    });
  }
});

// ─── SETTINGS ROUTES ──────────────────────────────────────────────────────────

// GET /api/users/settings — fetch all settings (notifications, privacy, security)
router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({
      status: 'success',
      data: { settings: user.preferences }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error fetching settings' });
  }
});

// PUT /api/users/settings/notifications
router.put('/settings/notifications', authenticateToken, async (req, res) => {
  try {
    const { email, sms, push, appointmentReminders, healthTips, marketingEmails } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    user.preferences = user.preferences || {};
    user.preferences.notifications = {
      ...user.preferences.notifications,
      ...(email !== undefined && { email }),
      ...(sms !== undefined && { sms }),
      ...(push !== undefined && { push }),
      ...(appointmentReminders !== undefined && { appointmentReminders }),
      ...(healthTips !== undefined && { healthTips }),
      ...(marketingEmails !== undefined && { marketingEmails }),
    };

    user.markModified('preferences');
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Notification preferences updated',
      data: { notifications: user.preferences.notifications }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error updating notification settings' });
  }
});

// PUT /api/users/settings/privacy
router.put('/settings/privacy', authenticateToken, async (req, res) => {
  try {
    const { profileVisibility, shareDataWithResearchers, allowAnonymousAnalytics } = req.body;

    const validVisibility = ['public', 'private', 'doctors_only'];
    if (profileVisibility && !validVisibility.includes(profileVisibility)) {
      return res.status(400).json({ status: 'error', message: 'Invalid profileVisibility value' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    user.preferences = user.preferences || {};
    user.preferences.privacy = {
      ...user.preferences.privacy,
      ...(profileVisibility !== undefined && { profileVisibility }),
      ...(shareDataWithResearchers !== undefined && { shareDataWithResearchers }),
      ...(allowAnonymousAnalytics !== undefined && { allowAnonymousAnalytics }),
    };

    user.markModified('preferences');
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Privacy settings updated',
      data: { privacy: user.preferences.privacy }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error updating privacy settings' });
  }
});

// PUT /api/users/settings/change-password
router.put('/settings/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Please provide current and new password' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ status: 'error', message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: 'success', message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error changing password' });
  }
});

// PUT /api/users/settings/security
router.put('/settings/security', authenticateToken, async (req, res) => {
  try {
    const { twoFactorEnabled, loginAlerts } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    user.preferences = user.preferences || {};
    user.preferences.security = {
      ...user.preferences.security,
      ...(twoFactorEnabled !== undefined && { twoFactorEnabled }),
      ...(loginAlerts !== undefined && { loginAlerts }),
    };

    user.markModified('preferences');
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Security settings updated',
      data: { security: user.preferences.security }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error updating security settings' });
  }
});

module.exports = router;