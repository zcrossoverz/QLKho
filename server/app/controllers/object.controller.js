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

    pool.execute(`SELECT COUNT(id) a FROM hanghoa WHERE name='${name}'`,(err, rows) => {
         if(rows[0].a > 0) {
            res.send({ message:'exists' });
         }else{
            pool.execute(`INSERT INTO hanghoa (name,gianhap,giabanle,giabansi,idNCC,idDVT,idDM) VALUES ('${name}',${gianhap},${giabanle},${giabansi},${idNCC},${idDVT},${idDM});`, (err, rows) => {
                if(err) return next(new BadRequestError(500,`Có lỗi khi thêm vào data ${err}`));
                res.send({message:"success"});
            });
         }
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


    pool.execute(`SELECT COUNT(id) a FROM hanghoa WHERE name='${name}'`,(err, rows) => {
        if(rows[0].a > 0){
            res.send({message:'exists'});
        }else{
            if(!name || !gianhap || !giabanle || !giabansi || !idNCC || !idDVT || !idDM) return next(new BadRequestError(500, "Thông tin chưa đầy đủ!"));
            pool.execute(`UPDATE hanghoa SET name='${name}',gianhap=${gianhap},giabanle=${giabanle},giabansi=${giabansi},idNCC=${idNCC},idDM=${idDM},idDVT=${idDVT} WHERE id=${req.params.id}`, (err,rows) => {
                if(err) return next(new BadRequestError(500,"Lỗi khi cập nhật dữ liệu"));
                res.send({message:"success"});
            });
        }
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
    pool.execute("SELECT hanghoa.id id, hanghoa.name name, donvitinh.name name_dvt, hanghoa.giabanle giabanle, hanghoa.giabansi giabansi, hanghoa.gianhap gianhap, nhacungcap.name name_ncc, danhmuc.name name_dm FROM hanghoa LEFT JOIN donvitinh ON hanghoa.idDVT=donvitinh.id LEFT JOIN danhmuc ON hanghoa.idDM=danhmuc.id LEFT JOIN nhacungcap ON hanghoa.idNCC=nhacungcap.id", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu trong database"));
        res.send(rows);
    });
};

// list hàng hóa theo ncc
exports.listByNCC = (req, res, next) => {
    pool.execute(`SELECT hanghoa.id id, hanghoa.name name, donvitinh.name name_dvt, hanghoa.giabanle giabanle, hanghoa.giabansi giabansi, hanghoa.gianhap gianhap, nhacungcap.name name_ncc, danhmuc.name name_dm FROM hanghoa LEFT JOIN donvitinh ON hanghoa.idDVT=donvitinh.id LEFT JOIN danhmuc ON hanghoa.idDM=danhmuc.id LEFT JOIN nhacungcap ON hanghoa.idNCC=nhacungcap.id WHERE nhacungcap.id=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu trong database"));
        res.send(rows);
    });
};

// lấy ra thông tin hàng hóa
exports.findOne = (req, res, next) => {
    pool.execute(`SELECT a.id, a.name, a.gianhap, a.giabanle, a.giabansi, a.idNCC, b.name name_dvt, a.idDVT, c.name name_ncc, a.idDM, d.name name_dm from hanghoa a, donvitinh b, nhacungcap c, danhmuc d WHERE a.idDVT=b.id AND a.idNCC = c.id AND a.idDM=d.id AND a.id=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi lấy dữ liệu"));
        res.send(rows[0]);
    });
};