const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantId: Number,
  items: [
    {
      name: String,
      price: Number,
      size: String,
      quantity: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "preparing"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
