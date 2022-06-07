const customer = require("../controllers/customer.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/add", customer.create);
    router.get("/", customer.list);
    router.get("/:id", customer.getOne);
    router.put("/:id", customer.update);
    router.delete("/:id", customer.delete);

    app.use("/api/customer", router);
}