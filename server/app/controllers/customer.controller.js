const pool = require("../database");
const { BadRequestError } = require("../helpers/errors");


// thêm khách hàng
exports.create = async (req, res, next) => {
    let name = req.body.name;
    let sdt = req.body.sdt;
    let diachi = req.body.diachi;
    let email = req.body.email;
    let ngayhoptac = req.body.ngayhoptac;

    if(!name || !sdt || !diachi || !email || !ngayhoptac) return next(new BadRequestError(500, "Thông tin chưa đầy đủ"));
    pool.execute(`INSERT INTO khachhang (name, sdt, diachi, email, ngayhoptac) VALUES ('${name}',${sdt},'${diachi}','${email}',DATE('${ngayhoptac}'))`, (err) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi thêm mới"));
        res.send({message:"success"});
    });

};

// lấy dữ liệu một khách hàng
exports.getOne = async (req, res, next) => {
    pool.execute(`SELECT * FROM khachhang WHERE id=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu"));
        res.send(rows[0]);
    })
}

// sửa một khách hàng
exports.update = async (req, res, next) => {
    let name = req.body.name;
    let sdt = req.body.sdt;
    let diachi = req.body.diachi;
    let email = req.body.email;
    let ngayhoptac = req.body.ngayhoptac;
    if(!name || !sdt || !diachi || !email || !ngayhoptac) return next(new BadRequestError(500, "Thông tin chưa đầy đủ"));
    
    pool.execute(`UPDATE khachhang SET name='${name}',sdt=${sdt},diachi='${diachi}',email='${email}',ngayhoptac=DATE('${ngayhoptac}') WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi cập nhật dữ liệu"));
        res.send({message:"success"});
    })
};

// xóa khách hàng
exports.delete = async (req, res, next) => {
    pool.execute(`DELETE FROM khachhang WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi xóa"));
        res.send({message:"success"});
    })
};

// liệt kê
exports.list = async (req, res, next) => {
    pool.execute("SELECT * FROM khachhang",(err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu"));
        res.send(rows);
    });
}