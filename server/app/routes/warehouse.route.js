const warehouse = require("../controllers/warehouse.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/add", warehouse.taoDonHang);
    router.get("/", warehouse.getList);
    router.get("/donnhap", warehouse.getListNhap);
    router.get("/donxuat", warehouse.getListXuat);
    router.get("/:id", warehouse.getOne);
    router.get("/chitiet/:id", warehouse.detail);
    router.delete("/:id", warehouse.delete);

    app.use("/api/warehouse", router);
}