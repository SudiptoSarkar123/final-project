const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: String,
    clientCount: String,
    howHeard: String,
    socialMediaLink: String,
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Closed'],
        default: 'New'
    },
    receivedAt: { 
        type: Date,
        default: Date.now
    }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;