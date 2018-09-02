const express = require("express");
const router = express.Router();

const Tools = require("./../tools");

const baseUrl = "/api/v1";
const publicApiUrl = `${baseUrl}/public`;
const privateApiUrl = `${baseUrl}/private`;

router.use(`${privateApiUrl}/users`, require("./users"));

router.get("/", (req, res) => {
    req.body = {};

    Tools.response(res, "Echo");
});


router.get(publicApiUrl, (req, res) => {
    req.body = {};

    Tools.response(res, "Echo");
});

router.get(privateApiUrl, (req, res) => {
    req.body = {};

    Tools.response(res, "Echo");
});

module.exports = router;