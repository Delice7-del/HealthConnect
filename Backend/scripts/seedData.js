const mongoose = require('mongoose');
const HealthCondition = require('../models/HealthCondition');
const Clinic = require('../models/Clinic');
require('dotenv').config({ path: './config.env' });

// Sample health conditions data
const healthConditions = [
  {
    name: 'Diabetes',
    description: 'A chronic disease that affects how your body turns food into energy.',
    symptoms: [
      'Increased thirst',
      'Frequent urination',
      'Extreme hunger',
      'Unexplained weight loss',
      'Fatigue',
      'Blurred vision'
    ],
    causes: [
      'Type 1: Autoimmune response',
      'Type 2: Lifestyle factors and genetics',
      'Gestational: Pregnancy hormones'
    ],
    riskFactors: [
      'Family history',
      'Obesity',
      'Physical inactivity',
      'Age over 45'
    ],
    prevention: [
      'Maintain healthy weight',
      'Regular exercise',
      'Balanced diet',
      'Regular check-ups'
    ],
    treatment: {
      medications: ['Insulin', 'Metformin', 'Sulfonylureas'],
      lifestyle: ['Diet management', 'Regular exercise', 'Blood sugar monitoring'],
      procedures: ['Insulin pump therapy', 'Bariatric surgery']
    },
    severity: 'high',
    category: 'endocrine',
    icon: 'heartbeat',
    color: '#3b82f6',
    featured: true,
    emergencySigns: [
      'Very high blood sugar',
      'Ketones in urine',
      'Severe dehydration',
      'Confusion or drowsiness'
    ],
    whenToSeekHelp: 'Seek immediate medical attention if you experience diabetic ketoacidosis symptoms or very high blood sugar levels.',
    statistics: {
      prevalence: '463 million people worldwide',
      mortalityRate: '4.2 million deaths annually',
      ageGroup: 'All ages, most common in adults'
    }
  },
  {
    name: 'Hypertension',
    description: 'High blood pressure that can lead to serious health problems.',
    symptoms: [
      'Headaches',
      'Shortness of breath',
      'Nosebleeds',
      'Chest pain',
      'Dizziness',
      'Vision problems'
    ],
    causes: [
      'Unhealthy diet',
      'Lack of physical activity',
      'Obesity',
      'Stress',
      'Genetics'
    ],
    riskFactors: [
      'Age over 65',
      'Family history',
      'Obesity',
      'High salt intake',
      'Alcohol consumption'
    ],
    prevention: [
      'Reduce salt intake',
      'Regular exercise',
      'Maintain healthy weight',
      'Limit alcohol',
      'Manage stress'
    ],
    treatment: {
      medications: ['ACE inhibitors', 'Beta blockers', 'Diuretics', 'Calcium channel blockers'],
      lifestyle: ['DASH diet', 'Regular exercise', 'Stress management', 'Quit smoking'],
      procedures: ['Renal denervation', 'Baroreceptor activation therapy']
    },
    severity: 'high',
    category: 'cardiovascular',
    icon: 'tachometer-alt',
    color: '#ef4444',
    featured: true,
    emergencySigns: [
      'Severe headache',
      'Chest pain',
      'Difficulty breathing',
      'Vision changes',
      'Irregular heartbeat'
    ],
    whenToSeekHelp: 'Seek immediate medical attention if you experience severe symptoms or blood pressure above 180/120 mmHg.',
    statistics: {
      prevalence: '1.13 billion people worldwide',
      mortalityRate: '7.5 million deaths annually',
      ageGroup: 'Most common in adults over 40'
    }
  },
  {
    name: 'Asthma',
    description: 'A condition that affects the airways in the lungs, making breathing difficult.',
    symptoms: [
      'Wheezing',
      'Shortness of breath',
      'Chest tightness',
      'Coughing, especially at night',
      'Difficulty sleeping'
    ],
    causes: [
      'Allergies',
      'Respiratory infections',
      'Exercise',
      'Air pollution',
      'Weather changes'
    ],
    riskFactors: [
      'Family history',
      'Allergies',
      'Obesity',
      'Smoking',
      'Occupational exposure'
    ],
    prevention: [
      'Avoid triggers',
      'Use air purifiers',
      'Regular check-ups',
      'Action plan',
      'Vaccinations'
    ],
    treatment: {
      medications: ['Inhaled corticosteroids', 'Bronchodilators', 'Leukotriene modifiers'],
      lifestyle: ['Avoid triggers', 'Regular exercise', 'Healthy diet', 'Stress management'],
      procedures: ['Bronchial thermoplasty', 'Allergy immunotherapy']
    },
    severity: 'medium',
    category: 'respiratory',
    icon: 'lungs',
    color: '#22c55e',
    featured: true,
    emergencySigns: [
      'Severe shortness of breath',
      'Chest pain',
      'Difficulty speaking',
      'Blue lips or fingernails',
      'No improvement with rescue inhaler'
    ],
    whenToSeekHelp: 'Seek immediate medical attention if you experience severe asthma symptoms that don\'t improve with your rescue inhaler.',
    statistics: {
      prevalence: '339 million people worldwide',
      mortalityRate: '400,000 deaths annually',
      ageGroup: 'All ages, most common in children'
    }
  }
];

// Sample clinics data
const clinics = [
  {
    name: 'City Health Center',
    description: 'A comprehensive healthcare facility providing primary care and specialized services.',
    type: 'clinic',
    specialties: ['Primary Care', 'Cardiology', 'Diabetes Management', 'Preventive Care'],
    address: {
      street: '123 Health Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      coordinates: {
        latitude: 40.7505,
        longitude: -73.9934
      }
    },
    contact: {
      phone: '(555) 123-4567',
      email: 'info@cityhealthcenter.com',
      website: 'https://cityhealthcenter.com'
    },
    hours: {
      monday: { open: '8:00 AM', close: '6:00 PM', closed: false },
      tuesday: { open: '8:00 AM', close: '6:00 PM', closed: false },
      wednesday: { open: '8:00 AM', close: '6:00 PM', closed: false },
      thursday: { open: '8:00 AM', close: '6:00 PM', closed: false },
      friday: { open: '8:00 AM', close: '6:00 PM', closed: false },
      saturday: { open: '9:00 AM', close: '3:00 PM', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    services: [
      { name: 'Primary Care Visit', description: 'General health checkup', price: 150, insurance: true },
      { name: 'Diabetes Consultation', description: 'Specialized diabetes care', price: 200, insurance: true },
      { name: 'Cardiology Consultation', description: 'Heart health evaluation', price: 300, insurance: true }
    ],
    insurance: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealth'],
    languages: ['English', 'Spanish'],
    rating: { average: 4.5, count: 127 },
    amenities: ['Wheelchair Accessible', 'Parking Available', 'Free WiFi', 'Pharmacy'],
    emergencyServices: false,
    wheelchairAccessible: true,
    parking: true,
    isVerified: true,
    isActive: true,
    featured: true
  },
  {
    name: 'Community Medical Center',
    description: '24/7 emergency care and comprehensive medical services for the community.',
    type: 'emergency_center',
    specialties: ['Emergency Medicine', 'Trauma Care', 'Critical Care', 'Surgery'],
    address: {
      street: '456 Medical Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA',
      coordinates: {
        latitude: 40.7168,
        longitude: -73.9861
      }
    },
    contact: {
      phone: '(555) 987-6543',
      email: 'emergency@communitymedical.com',
      website: 'https://communitymedical.com'
    },
    hours: {
      monday: { open: '24/7', close: '24/7', closed: false },
      tuesday: { open: '24/7', close: '24/7', closed: false },
      wednesday: { open: '24/7', close: '24/7', closed: false },
      thursday: { open: '24/7', close: '24/7', closed: false },
      friday: { open: '24/7', close: '24/7', closed: false },
      saturday: { open: '24/7', close: '24/7', closed: false },
      sunday: { open: '24/7', close: '24/7', closed: false }
    },
    services: [
      { name: 'Emergency Room Visit', description: 'Emergency medical care', price: 500, insurance: true },
      { name: 'Trauma Care', description: 'Specialized trauma treatment', price: 1000, insurance: true },
      { name: 'Surgery', description: 'Various surgical procedures', price: 5000, insurance: true }
    ],
    insurance: ['All Major Insurance Plans'],
    languages: ['English', 'Spanish', 'French'],
    rating: { average: 4.8, count: 89 },
    amenities: ['Helipad', 'Advanced Imaging', 'Laboratory', 'Pharmacy', 'Cafeteria'],
    emergencyServices: true,
    wheelchairAccessible: true,
    parking: true,
    isVerified: true,
    isActive: true,
    featured: true
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// Seed health conditions
const seedHealthConditions = async () => {
  try {
    // Drop the collection to avoid duplicate key errors
    await mongoose.connection.dropCollection('healthconditions');
    
    // Insert new data
    const conditions = await HealthCondition.insertMany(healthConditions);
    console.log(`✅ Seeded ${conditions.length} health conditions`);
    
    return conditions;
  } catch (error) {
    console.error('Error seeding health conditions:', error);
    throw error;
  }
};

// Seed clinics
const seedClinics = async () => {
  try {
    // Drop the collection to avoid duplicate key errors
    await mongoose.connection.dropCollection('clinics');
    
    // Insert new data
    const clinicsData = await Clinic.insertMany(clinics);
    console.log(`✅ Seeded ${clinicsData.length} clinics`);
    
    return clinicsData;
  } catch (error) {
    console.error('Error seeding clinics:', error);
    throw error;
  }
};

// Main seeding function
const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    
    await seedHealthConditions();
    await seedClinics();
    
    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, seedHealthConditions, seedClinics }; 