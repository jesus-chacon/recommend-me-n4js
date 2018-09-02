const express = require("express");
const router = express.Router();

const Tools = require("./../tools");

const baseUrl = "/api/v1";
const publicApiUrl = `${baseUrl}/public`;
const privateApiUrl = `${baseUrl}/private`;

router.get("/", (req, res) => {
    req.body = {};

    Tools.response(res, {data: "Echo"});
});


router.get(publicApiUrl, (req, res) => {
    req.body = {};

    Tools.response(res, {data: "Echo"});
});

router.get(privateApiUrl, (req, res) => {
    req.body = {};

    Tools.response(res, {data: "Echo"});
});

module.exports = router;