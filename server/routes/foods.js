const express = require("express");
const router = express.Router();
const {check} = require("express-validator/check");

const Tools = require("../tools");

const {createFood} = require("../actions");

router.post("/", [check("name").isLength({min: 1})], Tools.checkErrRequest, (req, res) => {
    Tools.manageResponse(res, "Error creating the user", createFood(req.body));
});

module.exports = router;