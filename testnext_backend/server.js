const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Define the routes first
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const predictRoutes = require("./routes/predict");
app.use("/predict", predictRoutes);

// Sync the database and start the server
sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(5001, () => console.log("Server running on port 5001"));
});
