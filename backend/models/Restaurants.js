const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  cuisine: String,
  rating: Number,
  menu: [
    {
      id: Number,
      name: String,
      price: Number,
      image: String
    }
  ]
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
