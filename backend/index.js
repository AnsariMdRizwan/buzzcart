require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-route.js");
const adminProductsRouter = require("./routes/admin/products-routes.js");
const shopProductsRouter = require("./routes/shop/product-routes.js");
const shopCartsRouter = require("./routes/shop/carts-routes.js");
const shopAddressRouter = require("./routes/shop/address-route.js");
const shopOrderRouter = require("./routes/shop/order-routes.js");
const adminOrderRouter = require("./routes/admin/order-routes.js");
const searchProductRouter = require("./routes/shop/search-routes.js");
const reviewRouter = require("./routes/shop/review-route.js");
const commonFeaturesRouter = require("./routes/common/feature-routes.js");
const commonProfileRouter = require("./routes/common/profile-route.js");

const app = express();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; // Use MongoDB connection from .env
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
    cors({
        origin: CLIENT_URL,
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/product", adminProductsRouter);
app.use("/api/shop/product", shopProductsRouter);
app.use("/api/shop/cart", shopCartsRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/search", searchProductRouter);
app.use("/api/shop/review", reviewRouter);
app.use("/api/common/features", commonFeaturesRouter);
app.use("/api/common/profile", commonProfileRouter);

// Connect to MongoDB using the .env variable
mongoose.connect(MONGO_URI
).then(() => {
    console.log("Connected to the database successfully");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
