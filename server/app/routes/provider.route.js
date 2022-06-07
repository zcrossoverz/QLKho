const provider = require("../controllers/provider.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/add", provider.create);
    router.get("/", provider.list);
    router.get("/:id", provider.getOne);
    router.put("/:id", provider.update);
    router.delete("/:id", provider.delete);

    app.use("/api/provider", router);
}