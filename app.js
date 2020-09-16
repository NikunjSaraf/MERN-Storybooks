require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

//Routes Import
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const storiesRoutes = require("./routes/stories");
//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb database Connected"));

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", storiesRoutes);
//Port
const PORT = process.env.PORT || 8000;

//Server
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
