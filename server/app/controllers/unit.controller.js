const pool = require("../database");
const { BadRequestError } = require("../helpers/errors");

// thêm đơn vị tính
exports.create = async (req, res, next) => {
    let name = req.body.name; // tên đơn vị tính

    if(!name) return next(new BadRequestError(500, "Thông tin chưa đầy đủ!"));

    pool.execute(`INSERT INTO donvitinh (name) VALUES ('${name}');`, (err) => {
        if(err) return next(new BadRequestError(500,`Có lỗi khi thêm vào data ${err}`));
        res.send({message:"success"});
    });
};

// sửa đơn vị tính
exports.update = async (req, res, next) => {
    let name = req.body.name;
    if(!name) return next(new BadRequestError(500, "Thông tin không đầy đủ"));
    pool.execute(`UPDATE donvitinh SET name='${name}' WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi cập nhật dữ liệu"));
        res.send({message:"success"});
    });
};


// xóa đơn vị tính
exports.delete = async (req, res, next) => {
    pool.execute(`DELETE FROM donvitinh WHERE id=${req.params.id}`, (err) => {
        if(err) return next(new BadRequestError(500,"Lỗi khi xóa đơn vị tính"));
        res.send({message:"success"});
    });
};

// liệt kê
exports.list = async (req, res, next) => {
    pool.execute("SELECT * FROM donvitinh", (err, rows) => {
        if(err) next(new BadRequestError(500, "Lỗi khi truy vấn dữ liệu"));
        res.send(rows);
    })
}
