const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@healthconnect.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = await User.create({
            name: 'System Administrator',
            email: adminEmail,
            password: 'Admin@123',
            role: 'admin',
            isVerified: true,
            status: 'active'
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@healthconnect.com');
        console.log('Password: Admin@123');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error.message);
        process.exit(1);
    }
};

createAdmin();
