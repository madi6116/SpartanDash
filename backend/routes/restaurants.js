const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: "pizzamyheart",
      name: "Pizza My Heart",
      address: "1 Washington Square, San Jose, CA",
      cuisine: "Pizza, Italian",
      rating: 4.8,
      time: "15–25 min",
      minOrder: "$10 min order",
      img: "pizzamyheart" // <-- frontend maps this to actual image
    },
    {
      id: "lavictoria",
      name: "La Victoria Taqueria",
      address: "140 E San Carlos St, San Jose, CA",
      cuisine: "Mexican, Burritos",
      rating: 4.7,
      time: "10–20 min",
      minOrder: "$10 min order",
      img: "lavictoria"   // <-- frontend maps this to actual image
    }
  ]);
});

module.exports = router;
