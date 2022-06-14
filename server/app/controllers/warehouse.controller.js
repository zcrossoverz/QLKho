const pool = require("../database");
const { BadRequestError } = require("../helpers/errors");

// tao don hang xuat / nhap
exports.taoDonHang = async (req, res, next) => {

    let type = req.body.type; // type = 1 = don nhap, type = 2 = don xuat
    let status = req.body.status; // status = 1 = da thanh toan, status = 2 = chua thanh toan, = 3 = cancer order
    let note = req.body.note;
    let id2 = req.body.id2; // type = 1 => id nha cung cap, type = 2 => id khach hang
    let dulieudonhang = req.body.info;

    if(!type || !status || !id2) return next(new BadRequestError(500, "Thông tin chưa đầy đủ"));
    pool.execute(`INSERT INTO donhang (type, status, note, id2, time) VALUES (${type}, ${status}, '${note}', ${id2}, time(now()))`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi thêm mới"));
        let idDH = rows.insertId;
        dulieudonhang.map((e) => {
            pool.execute(`INSERT INTO chitietdonhang (idHH, idDH, soluong, gia) VALUES (${e.idHH}, ${idDH}, ${e.soluong}, ${e.gia})`, (err) => {
                if(err) return next(new BadRequestError(500, "Lỗi khi thêm chi tiết đơn hàng"));
            });
        });
        res.send({message:"success"});
    });

};

// get full list don hang
exports.getList = async (req, res, next) => {
    pool.execute("SELECT * FROM donhang", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

// get list don xuat
exports.getListXuat = async (req, res, next) => {
    pool.execute("SELECT * FROM donhang WHERE type=2", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

// get list don nhap
exports.getListNhap = async (req, res, next) => {
    pool.execute("SELECT * FROM donhang WHERE type=1", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

// lay thong tin 1 don hang
exports.getOne = async (req, res, next) => {
    pool.execute(`SELECT * FROM donhang WHERE id=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows[0]);
    });
};

// chi tiet 1 don hang
exports.detail = async (req, res, next) => {
    pool.execute(`SELECT * FROM chitietdonhang WHERE idDH=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

// delete one 
exports.delete = async (req, res, next) => {
    pool.execute(`DELETE FROM donhang WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500, "Error"));
    });
    pool.execute(`DELETE FROM chitietdonhang WHERE idDH=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500, "Error"));
    });
    res.send({message:"success"});
}