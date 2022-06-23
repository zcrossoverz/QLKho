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
    router.get("/danhmuc", warehouse.listByDM);
    router.get("/nhacungcap", warehouse.listByNCC);
    router.get("/doanhso", warehouse.doanhso);
    router.get("/baocaods", warehouse.baoCaoDoanhso);
    router.get("/chuatt", warehouse.getDonChuaThanhToan);
    router.get("/don/:id", warehouse.getInfoDon);
    router.get("/datadon/:id", warehouse.getDataDon);
    router.get("/thanhtoan/:id", warehouse.thanhtoan);
    router.get("/:id", warehouse.getOne);
    router.get("/kho/:id", warehouse.getInfoSPTonKho);
    router.get("/chitiet/:id", warehouse.detail);
    router.get("/lichsu/:id", warehouse.getLichsu);
    router.post("/dsall", warehouse.getDSDayAll);
    router.post("/dsone", warehouse.getDSDayOne);
    router.delete("/:id", warehouse.delete);

    app.use("/api/warehouse", router);
}