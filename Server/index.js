// require('dotenv').config();
// const express = require('express');
// const Stripe = require('stripe');
// const cors = require('cors');

// const app = express();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Load your secret key from .env

// app.use(express.json());
// app.use(cors());

// // Endpoint to create a payment intent
// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount, // Amount in cents ($10 = 1000)
//       currency: 'usd',
//       automatic_payment_methods: { enabled: true },
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start server
// app.listen(3000, () => console.log('Server running on port 3000'));





require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

// MongoDB connection setup
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });

// Define the shipment schema
const shipmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    completedAt: Date,
    paymentIntentId: String,
    amount: Number
});

// Define the payment schema with added fields
const paymentSchema = new mongoose.Schema({
    shipmentId: mongoose.Schema.Types.ObjectId,
    paymentIntentId: String,
    amount: Number,
    currency: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
    name: String,       // Added name field
    email: String,      // Added email field
    address: String     // Added address field
});

// Create models for shipments and payments
const Shipment = mongoose.model('Shipment', shipmentSchema);
const Payment = mongoose.model('Payment', paymentSchema);

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
    const { amount, shipmentData } = req.body;

    try {
        // Create a new shipment record
        const shipmentResult = await Shipment.create({
            ...shipmentData,
            amount,
            status: 'Pending',
        });

        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });

        // Save payment information to the Payment collection, including the new fields
        await Payment.create({
            shipmentId: shipmentResult._id,
            paymentIntentId: paymentIntent.id,
            amount: amount,
            currency: 'usd',
            status: 'Pending',
            name: shipmentData.name,
            email: shipmentData.email,
            address: shipmentData.address
        });

        res.json({ clientSecret: paymentIntent.client_secret, shipmentId: shipmentResult._id });
    } catch (error) {
        console.error("Error creating payment intent or saving data:", error);
        res.status(500).json({ error: "Failed to create payment intent or save data." });
    }
});

// Complete payment endpoint
app.post('/payment-complete', async (req, res) => {
    const { shipmentId, paymentIntentId } = req.body;

    try {
        // Update the shipment status to completed
        const shipmentResult = await Shipment.updateOne(
            { _id: shipmentId },
            { $set: { status: 'Completed', paymentIntentId, completedAt: new Date() } }
        );

        if (shipmentResult.matchedCount === 0) {
            return res.status(404).json({ error: "Shipment not found" });
        }

        // Update the payment record to completed
        const paymentResult = await Payment.updateOne(
            { paymentIntentId: paymentIntentId },
            { $set: { status: 'Completed', completedAt: new Date() } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error("Error completing payment:", error);
        res.status(500).json({ error: "Failed to complete payment." });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
