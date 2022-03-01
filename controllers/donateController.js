const { Donate } = require("../models/donate");

const omise = require("omise")({
  secretKey: process.env.SECRET_KEY_OMISE,
  publicKey: process.env.PUBLIC_KEY_OMISE,
});

exports.createDonate = async (req, res, next) => {
  try {
    const { email, description, card, amount, currency, customer } = req.body;
    const customers = await omise.customers.create({
      email,
      description: "test user",
      card,
    });
    const charge = await omise.charges.create({
      amount: 3000,
      currency: "thb",
      customer: customers.id,
    });

    console.log(charge);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
