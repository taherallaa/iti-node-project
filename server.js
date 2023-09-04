require("./dbConnection");
require("dotenv").config();

const bodyParser = require("body-parser");

const express = require("express");
const userRouter = require("./routes/user-route");
const productRouter = require("./routes/product-routes");
const cartRouter = require("./routes/cart-routes");
const orderRouter = require("./routes/order-routes");

const port = process.env.port;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", orderRouter);

app.listen(port, () => {
  console.log(`server is running on http://loaclhost:${port}`);
});
