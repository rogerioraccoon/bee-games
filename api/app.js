const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const categoriesRoute = require("./routes/categories");
app.use("/api/categories", categoriesRoute);

const productsRoute = require("./routes/products");
app.use("/api/products", productsRoute);

const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);

const transactionsRoute = require("./routes/transactions");
app.use("/api/transactions", transactionsRoute);

const clientsRoute = require("./routes/clients");
app.use("/api/clients", clientsRoute);

const AdminsRoute = require("./routes/admins");
app.use("/api/admins", AdminsRoute);

const reportsRoute = require("./routes/reports");
app.use("/api/reports", reportsRoute);

app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Connection with database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Database connected!");
});

// Listening
app.listen(3000);
