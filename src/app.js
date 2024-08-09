import express from "express";
const bodyparser = require("body-parser");
const router = require("./routes");
const cors = require("cors");
const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use("/", router);

module.exports = app;





