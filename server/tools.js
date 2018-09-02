const Tools = {};

Tools.response = (res, data) => {res.status(200).jsonp(data);};

Tools.errResponse = (res, err) => {res.status(500).jsonp(err);};

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

module.exports = Tools;