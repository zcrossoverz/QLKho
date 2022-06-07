const category = require("../controllers/category.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/add", category.create);
    router.get("/", category.list);
    router.put("/:id", category.update);
    router.delete("/:id", category.delete);

    app.use("/api/category", router);
}