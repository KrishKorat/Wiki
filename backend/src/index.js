require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/entries", require("./routes/entries"));

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));