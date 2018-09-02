const express = require("express");
const router = express.Router();
const {check} = require("express-validator/check");

const Tools = require("../tools");

const {createUser} = require("../actions");

router.post("/", [check("externalId").isLength({min: 1})], Tools.checkErrRequest, (req, res) => {
    Tools.manageResponse(res, "Error creating the user", createUser(req.body));
});

module.exports = router;