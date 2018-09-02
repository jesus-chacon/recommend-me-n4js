const app = require("./config");
const router = require("./routes");

app.use("/", router);

app.listen(process.env.EXPRESS_PORT, function () {
    console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`);
});