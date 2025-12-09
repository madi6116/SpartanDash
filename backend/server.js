const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// IMPORT USER ROUTES
const userRoutes = require("./routes/userRoutes"); 

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/restaurants", require("./routes/restaurants"));
// LINK USER ROUTES
app.use("/users", userRoutes); 

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "SpartanDash backend running" });
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));