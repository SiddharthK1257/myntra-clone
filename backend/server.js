const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userrouter = require("./routes/Userroutes");
const categoryrouter = require("./routes/Categoryroutes");
const productrouter = require("./routes/Productroutes");
const Bagroutes = require("./routes/Bagroutes");
const Wishlistroutes = require("./routes/Wishlistroutes");
const OrderRoutes = require("./routes/OrderRoutes");
const recentlyViewedRoute = require("./routes/recentlyViewed");
const tokenRoute = require("./routes/token");
const exportRoutes = require("./routes/exportRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const webhookRoutes = require("./routes/webhookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const cors = require('cors');
require("./cartReminder");
dotenv.config()
const dns = require("node:dns/promises");

dns.setServers(["1.1.1.1"]);
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', 
  credentials: true, 
}));
app.get('/', (req, res) => {
    res.send("✅Myntra backend in working")
})
app.use("/user", userrouter);
app.use("/category", categoryrouter);
app.use("/product", productrouter);
app.use("/bag", Bagroutes);
app.use("/wishlist", Wishlistroutes);
app.use("/Order", OrderRoutes);
app.use("/recently-viewed", recentlyViewedRoute);
app.use("/api/token", tokenRoute);
app.use("/api/export", exportRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/recommendations", recommendationRoutes);
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log("Mongodb connected");
}).catch(err => console.log(err));

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));