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
        res.send({message:"success"});
    });

};

// sửa thông tin hàng hóa
exports.update = async (req, res, next) => {
    let name = req.body.name; // tên hàng hóa
    let gianhap = req.body.gianhap; // giá nhập vào
    let giabanle = req.body.giabanle; // giá bán lẻ 
    let giabansi = req.body.giabansi; // giá bán sỉ
    let idNCC = req.body.idNCC; // id nhà cung cấp
    let idDVT = req.body.idDVT; // id đơn vị tính
    let idDM = req.body.idDM; // id danh mục

    if(!name || !gianhap || !giabanle || !giabansi || !idNCC || !idDVT || !idDM) return next(new BadRequestError(500, "Thông tin chưa đầy đủ!"));
    pool.execute(`UPDATE hanghoa SET name='${name}',gianhap=${gianhap},giabanle=${giabanle},giabansi=${giabansi},idNCC=${idNCC},idDM=${idDM},idDVT=${idDVT} WHERE id=${req.params.id}`, (err,rows) => {
        if(err) return next(new BadRequestError(500,"Lỗi khi cập nhật dữ liệu"));
        res.send({message:"success"});
    });

};


// xóa hàng hóa
exports.delete = async (req, res, next) => {
    pool.execute(`DELETE FROM hanghoa WHERE id=${req.params.id}`, (err) => {
        if(err) next(new BadRequestError(500, "Lỗi khi xóa hàng hóa"));
        res.send({message:"success"});
    })
};

// list hàng hóa
exports.list = (req, res, next) => {
    pool.execute("SELECT * FROM hanghoa", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu trong database"));
        res.send(rows);
    });
};

// lấy ra thông tin hàng hóa
exports.findOne = (req, res, next) => {
    pool.execute(`SELECT * FROM hanghoa where id=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu"));
        res.send(rows[0]);
    });
};