const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IQfQlLuJ1HeLhSP1heUoJAM2hJAui417xDk5zNlYrQyIak7yTzfPcUmfOJMmvIP8vwgkvsowm6RY1NdfYx3q3bi00NZacB3sa");

// API
// - app config
const app = express();

// - middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - api routes
app.get('/', (request, response) => response.status(200).send('hello world'));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log('payment reqest recived', total)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, 
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// - listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/clone-cc6c4/us-central1/api