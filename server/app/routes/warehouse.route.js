const warehouse = require("../controllers/warehouse.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.post("/add", warehouse.taoDonHang);
    router.get("/", warehouse.getList);
    router.get("/donnhap", warehouse.getListNhap);
    router.get("/donxuat", warehouse.getListXuat);
    router.get("/tonkho", warehouse.getTonKho);
    router.get("/sptonkho", warehouse.getSPTonKho);
    router.get("/sptonkho/:type", warehouse.getSPTonKho2);
    router.get("/chuatt", warehouse.getDonChuaThanhToan);
    router.get("/don/:id", warehouse.getInfoDon);
    router.get("/datadon/:id", warehouse.getDataDon);
    router.get("/thanhtoan/:id", warehouse.thanhtoan);
    router.get("/:id", warehouse.getOne);
    router.get("/chitiet/:id", warehouse.detail);
    router.delete("/:id", warehouse.delete);

    app.use("/api/warehouse", router);
}