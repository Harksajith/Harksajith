const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const stripe = require('stripe')('your-stripe-secret-key'); // Use your Stripe Secret Key
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB (same as before)
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Routes
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Payment Route (new route)
app.post('/api/checkout', async (req, res) => {
    const { amount, currency } = req.body;
    
    try {
        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in smallest currency unit (e.g., cents for USD)
            currency: currency, // E.g., 'usd'
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        // Send the client secret key for the client to complete the payment
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
