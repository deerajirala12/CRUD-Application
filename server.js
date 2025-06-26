const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // optional if using .env

const itemRoutes = require('./itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/items', itemRoutes);
app.use(express.static('public'));

// Connect to MongoDB and start server only after successful connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});