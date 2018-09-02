const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");

const app = express();

if (process.env.EXPRESS_DEBUG == "true") {
    app.use("/api", morgan("dev"));
} else {
    app.use(compression());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;