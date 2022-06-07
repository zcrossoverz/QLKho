const pool = require("../database");
const { BadRequestError } = require("../helpers/errors");

// thêm hàng hóa
exports.create = async (req, res, next) => {
    let name = req.body.name; // tên hàng hóa
    let gianhap = req.body.gianhap; // giá nhập vào
    let giabanle = req.body.giabanle; // giá bán lẻ 
    let giabansi = req.body.giabansi; // giá bán sỉ
    let idNCC = req.body.idNCC; // id nhà cung cấp
    let idDVT = req.body.idDVT; // id đơn vị tính
    let idDM = req.body.idDM; // id danh mục

    if(!name || !gianhap || !giabanle || !giabansi || !idNCC || !idDVT || !idDM) return next(new BadRequestError(500, "Thông tin chưa đầy đủ!"));

    pool.execute(`INSERT INTO hanghoa (name,gianhap,giabanle,giabansi,idNCC,idDVT,idDM) VALUES ('${name}',${gianhap},${giabanle},${giabansi},${idNCC},${idDVT},${idDM});`, (err, rows) => {
        if(err) return next(new BadRequestError(500,`Có lỗi khi thêm vào data ${err}`));
        res.send({rows});
    });

};

// sửa hàng hóa
exports.edit = async (req, res) => {
    res.send({ message: "edit" });
};


// xóa hàng hóa
exports.delete = async (req, res) => {
    res.send({ message: "delete" });
};

// list hàng hóa
exports.list = (req, res) => {
    pool.execute("SELECT * FROM hanghoa", (err, rows) => {
        if(err) throw err;
        res.send({rows});
    });
};