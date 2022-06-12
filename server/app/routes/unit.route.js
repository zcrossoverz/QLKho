const unit = require("../controllers/unit.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/add", unit.create);
    router.get("/", unit.list);
    router.put("/:id", unit.update);
    router.delete("/:id", unit.delete);
    router.get("/:id", unit.getOne);

    app.use("/api/unit", router);
}