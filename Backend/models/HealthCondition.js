const mongoose = require('mongoose');

const healthConditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a condition name'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  symptoms: [{
    type: String,
    required: true
  }],
  causes: [{
    type: String
  }],
  riskFactors: [{
    type: String
  }],
  prevention: [{
    type: String
  }],
  treatment: {
    medications: [String],
    lifestyle: [String],
    procedures: [String]
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['cardiovascular', 'respiratory', 'endocrine', 'neurological', 'gastrointestinal', 'musculoskeletal', 'mental_health', 'other'],
    required: true
  },
  icon: {
    type: String,
    default: 'default-icon'
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['article', 'video', 'pdf', 'website']
    }
  }],
  emergencySigns: [{
    type: String
  }],
  whenToSeekHelp: {
    type: String
  },
  statistics: {
    prevalence: String,
    mortalityRate: String,
    ageGroup: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  translations: {
    en: {
      name: String,
      description: String,
      symptoms: [String],
      causes: [String],
      prevention: [String]
    },
    es: {
      name: String,
      description: String,
      symptoms: [String],
      causes: [String],
      prevention: [String]
    },
    fr: {
      name: String,
      description: String,
      symptoms: [String],
      causes: [String],
      prevention: [String]
    },
    de: {
      name: String,
      description: String,
      symptoms: [String],
      causes: [String],
      prevention: [String]
    }
  }
}, {
  timestamps: true
});

// Create slug from name before saving
healthConditionSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  next();
});

// Index for search functionality
healthConditionSchema.index({ 
  name: 'text', 
  description: 'text', 
  symptoms: 'text' 
});

module.exports = mongoose.model('HealthCondition', healthConditionSchema); 