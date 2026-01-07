const mongoose = require('mongoose');

const healthResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: [true, 'Please provide content']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['wellness', 'diseases', 'first-aid', 'nutrition', 'mental-health', 'other']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    featuredImage: {
        type: String
    },
    tags: [String],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create slug before saving
healthResourceSchema.pre('save', function (next) {
    if (!this.isModified('title')) return next();
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    next();
});

module.exports = mongoose.model('HealthResource', healthResourceSchema);
