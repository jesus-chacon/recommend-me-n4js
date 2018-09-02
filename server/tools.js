const {validationResult} = require("express-validator/check");

const Tools = {};

Tools.response = (res, data) => {res.status(200).jsonp({data});};

Tools.errResponse = (res, err) => {res.status(422).jsonp({err});};

Tools.manageResponse = (res, err, promise) => {
    promise.then(data => {
        Tools.response(res, data);
    }).catch(throwErr => {
        Tools.err(throwErr);

        Tools.errResponse(res, err);
    });
};

Tools.log = (data) => {
    if (process.env.DEBUG) {
        console.log(data);
    }
};

Tools.err = (data) => {
    if (process.env.DEBUG) {
        console.error(data);
    }
};

Tools.checkErrRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Tools.errResponse(res, {errors: errors.array()});
    } else {
        next();
    }
};

module.exports = Tools;