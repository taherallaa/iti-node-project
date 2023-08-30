require("./dbConnection");
require("dotenv").config();

const bodyParser = require("body-parser");

const express = require("express");
const router = require("./routes/user-route");

const port = process.env.port;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on http://loaclhost:${port}`);
});
