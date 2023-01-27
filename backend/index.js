const express = require('express');
var cors = require('cors');
const mongoose = require("mongoose");
const register = require('./routes/authRoute');
const login = require('./routes/login');
const stripe = require('./routes/stripe');
const productsRoute = require('./routes/products')
const products = require("./data/products");
const { OAuth2Client } = require("google-auth-library");
const users = require("./routes/users")
const orders = require("./routes/orders");
const productsController = require('./controllers/productsController');



const app = express();

require("dotenv").config()

const PORT = process.env.PORT || 5000;
const url = process.env.MONGODB_URL
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  }));
app.use(express.json());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/signup", OAuth2Client);
app.use('/products', productsController);




app.get("/", (req, res) => {
    res.send("Welcome to our E-Snabbhemköp shop API...");
});

app.get("/products", (req, res) => {
    res.send(products);
});

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
});

mongoose.set('strictQuery', false);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connection successful..."))
.catch((err) => console.log("MongoDB connection failed", err.message))
