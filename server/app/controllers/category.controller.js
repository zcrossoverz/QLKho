const pool = require("../database");
const { BadRequestError } = require("../helpers/errors");

// thêm danh mucj
exports.create = async (req, res, next) => {
    let name = req.body.name; // tên đơn vị tính

    if(!name) return next(new BadRequestError(500, "Thông tin chưa đầy đủ!"));

    pool.execute(`INSERT INTO danhmuc (name) VALUES ('${name}');`, (err) => {
        if(err) return next(new BadRequestError(500,`Có lỗi khi thêm vào data ${err}`));
        res.send({message:"success"});
    });
};

// sửa danh mục
exports.update = async (req, res, next) => {
    let name = req.body.name;
    if(!name) return next(new BadRequestError(500, "Thông tin không đầy đủ"));
    pool.execute(`UPDATE danhmuc SET name='${name}' WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi cập nhật dữ liệu"));
        res.send({message:"success"});
    });
};


// xóa danh mục
exports.delete = async (req, res, next) => {
    pool.execute(`DELETE FROM danhmuc WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500,"Lỗi khi xóa danh mục"));
        res.send({message:"success"});
    });
};

// liệt kê
exports.list = async (req, res, next) => {
    pool.execute("SELECT * FROM danhmuc", (err, rows) => {
        if(err) next(new BadRequestError(500, "Lỗi khi truy vấn dữ liệu"));
        res.send(rows);
    });
};

// get one
exports.getOne = async (req, res, next) => {
    pool.execute(`SELECT * FROM danhmuc WHERE id=${req.params.id}`,(err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu"));
        res.send(rows[0]);
    });
};
