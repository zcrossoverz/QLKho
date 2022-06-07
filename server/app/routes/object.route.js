const object = require("../controllers/object.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", object.list);

    router.post("/add", object.create);

    app.use("/api/object", router);
}