const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Schedule Schema
const scheduleSchema = new mongoose.Schema({
    name: String,
    email: String,
    dateTime: Date,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Schedule Form Endpoint
app.post('/api/schedule', async (req, res) => {
    try {
        const { name, email, dateTime } = req.body;
        const newSchedule = new Schedule({ name, email, dateTime });
        await newSchedule.save();
        res.status(201).json({ message: 'Appointment scheduled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to schedule appointment' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));