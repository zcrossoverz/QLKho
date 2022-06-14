const object = require("../controllers/object.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", object.list);

    router.post("/add", object.create);
    router.get("/:id", object.findOne);
    router.get("/nhacungcap/:id", object.listByNCC);
    router.put("/:id", object.update);
    router.delete("/:id", object.delete);
    
    app.use("/api/object", router);
}