const express = require('express');
const router = express.Router();

// Get first aid guides
router.get('/', async (req, res) => {
  try {
    // In a real app, you'd fetch this from database
    const firstAidGuides = [
      {
        id: 1,
        title: 'Burns',
        icon: 'fire',
        color: 'red',
        steps: [
          'Cool the burn under cold running water',
          'Remove any jewelry near the burn',
          'Cover with sterile dressing',
          'Seek medical attention if severe'
        ],
        emergency: true
      },
      {
        id: 2,
        title: 'Cuts and Wounds',
        icon: 'cut',
        color: 'blue',
        steps: [
          'Clean the wound with soap and water',
          'Apply direct pressure to stop bleeding',
          'Apply antibiotic ointment',
          'Cover with sterile bandage'
        ],
        emergency: false
      },
      {
        id: 3,
        title: 'Choking',
        icon: 'lungs',
        color: 'orange',
        steps: [
          'Perform the Heimlich maneuver',
          'Give 5 back blows between shoulder blades',
          'Give 5 abdominal thrusts',
          'Call emergency services if needed'
        ],
        emergency: true
      },
      {
        id: 4,
        title: 'Heart Attack',
        icon: 'heart',
        color: 'red',
        steps: [
          'Call emergency services immediately',
          'Have the person sit down and rest',
          'Loosen tight clothing',
          'Monitor breathing and consciousness'
        ],
        emergency: true
      }
    ];

    res.status(200).json({
      status: 'success',
      data: {
        guides: firstAidGuides
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching first aid guides'
    });
  }
});

// Get specific first aid guide
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real app, you'd fetch this from database
    const guides = {
      1: {
        id: 1,
        title: 'Burns',
        icon: 'fire',
        color: 'red',
        description: 'First aid for different types of burns',
        steps: [
          'Cool the burn under cold running water',
          'Remove any jewelry near the burn',
          'Cover with sterile dressing',
          'Seek medical attention if severe'
        ],
        emergency: true,
        whenToSeekHelp: 'Seek immediate medical attention for burns larger than 3 inches, burns on face, hands, feet, or genitals, or if the burn appears white or charred.'
      },
      2: {
        id: 2,
        title: 'Cuts and Wounds',
        icon: 'cut',
        color: 'blue',
        description: 'How to treat minor cuts and wounds',
        steps: [
          'Clean the wound with soap and water',
          'Apply direct pressure to stop bleeding',
          'Apply antibiotic ointment',
          'Cover with sterile bandage'
        ],
        emergency: false,
        whenToSeekHelp: 'Seek medical attention if the wound is deep, won\'t stop bleeding, shows signs of infection, or was caused by a dirty object.'
      }
    };

    const guide = guides[id];
    if (!guide) {
      return res.status(404).json({
        status: 'error',
        message: 'First aid guide not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        guide
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching first aid guide'
    });
  }
});

module.exports = router; 