const pool = require("../database");
const { BadRequestError } = require("../helpers/errors");

// tao don hang xuat / nhap
exports.taoDonHang = async (req, res, next) => {

    let type = req.body.type; // type = 1 = don nhap, type = 2 = don xuat
    let status = req.body.status; // status = 1 = da thanh toan, status = 2 = chua thanh toan
    let note = req.body.note;
    let id2 = req.body.id2; // type = 1 => id nha cung cap, type = 2 => id khach hang
    let dulieudonhang = req.body.info;

    if(!type || !status || (!id2 && type==1)) return next(new BadRequestError(500, "Thông tin chưa đầy đủ"));
    pool.execute(`INSERT INTO donhang (type, status, note, id2, time) VALUES (${type}, ${status}, '${note}', ${id2}, time(now()))`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Lỗi khi thêm mới"));
        let idDH = rows.insertId;
        dulieudonhang.map(async (e) => {
            pool.execute(`INSERT INTO chitietdonhang (idHH, idDH, soluong, gia) VALUES (${e.idHH}, ${idDH}, ${e.soluong}, ${e.gia})`, (err) => {
                if(err) return next(new BadRequestError(500, "Lỗi khi thêm chi tiết đơn hàng"));
            });
            pool.execute(`INSERT INTO doanhthu (idHH) SELECT * FROM (SELECT ${e.idHH}) AS tmp WHERE NOT EXISTS (SELECT idHH FROM doanhthu WHERE idHH=${e.idHH}) LIMIT 1`, () => {
                if(type === 1) {
                    if(status === 1) { 
                        pool.execute(`UPDATE doanhthu SET tienvon=tienvon+${e.gia} WHERE idHH=${e.idHH}`);
                    }
                }else{
                    if(status === 1) {
                        pool.execute(`UPDATE doanhthu SET tienban=tienban+${e.gia} WHERE idHH=${e.idHH}`);
                    }
                }
            });
            pool.execute(`INSERT INTO kho (idHH, tonkho) SELECT * FROM (SELECT ${e.idHH},0) AS tmp WHERE NOT EXISTS (SELECT idHH FROM kho WHERE idHH=${e.idHH}) LIMIT 1`, (err) => {
                if(type === 1) {
                    if(status === 1) {
                        pool.execute(`UPDATE kho SET tonkho=tonkho+${e.soluong} WHERE idHH=${e.idHH}`);
                    }
                }else{
                    if(status === 1) {
                        pool.execute(`UPDATE kho SET tonkho=tonkho-${e.soluong}, daban=daban+${e.soluong} WHERE idHH=${e.idHH}`);
                    }
                }
            });

        });
        res.send({message:"success"});
    });


};

// get full list don hang
exports.getList = async (req, res, next) => {
    pool.execute("SELECT * FROM donhang ORDER BY id DESC;", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

// get list don xuat
exports.getListXuat = async (req, res, next) => {
    pool.execute("SELECT * FROM donhang WHERE type=2 ORDER BY id DESC", (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

// get list don nhap
exports.getListNhap = async (req, res, next) => {
    pool.execute("SELECT * FROM donhang WHERE type=1 ORDER BY id DESC", (err, rows) => {
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
};

// lay ra list ton kho
exports.getTonKho = async (req, res, next) => {
    pool.execute(`SELECT * FROM kho WHERE tonkho>0`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

exports.getDonChuaThanhToan = async (req, res, next) => {
    pool.execute('SELECT * FROM donhang WHERE status = 2', (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};


exports.getInfoDon = async (req, res, next) => {
    pool.execute(`SELECT * FROM donhang WHERE id=${req.params.id}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
}

exports.getDataDon = async (req, res, next) => {
    pool.execute(`SELECT a.id, a.idHH, a.idDH, a.soluong, a.gia, b.name, c.name dvt FROM chitietdonhang a, hanghoa b, donvitinh c WHERE idDH=${req.params.id} AND a.idHH=b.id AND b.idDVT=c.id`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

exports.thanhtoan = async (req, res, next) => {
    pool.execute(`SELECT a.id, a.idHH, a.idDH, a.soluong, a.gia, b.type FROM chitietdonhang a, donhang b WHERE a.idDH=b.id AND a.idDH=${req.params.id}`, (err, rows)=> {
        if(err) return next(new BadRequestError(500, "Error"));
        rows.map(e => {
            if(e.type===1){
                pool.execute(`UPDATE kho SET tonkho=tonkho+${e.soluong} WHERE idHH=${e.idHH}`);
                pool.execute(`UPDATE doanhthu SET tienvon=tienvon+${e.gia} WHERE idHH=${e.idHH}`);
            }else{
                pool.execute(`UPDATE kho SET tonkho=tonkho-${e.soluong}, daban=daban+${e.soluong} WHERE idHH=${e.idHH}`);
                pool.execute(`UPDATE doanhthu SET tienban=tienban+${e.gia} WHERE idHH=${e.idHH}`);
            }
        });
    });
    pool.execute(`UPDATE donhang SET status = 1 WHERE id=${req.params.id}`, (err)=> {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send({ message: 'success'});
    });
};

exports.getSPTonKho = async (req, res, next) => {
    pool.execute(`SELECT a.id, a.idHH, a.daban, a.tonkho, b.name, b.giabansi, b.giabanle, c.name dvt, d.name name_ncc,e.name name_dm FROM kho a, hanghoa b, donvitinh c, nhacungcap d, danhmuc e WHERE tonkho>0 AND a.idHH=b.id AND b.idDVT=c.id AND b.idNCC=d.id AND b.idDM=e.id`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

exports.getSPTonKho2 = async (req, res, next) => {
    let query = '';
    if(req.params.type===1)  query = 'ORDER BY tonkho DESC';
    else query = 'ORDER BY daban DESC';
    pool.execute(`SELECT a.id, a.idHH, a.daban, a.tonkho, b.name, b.giabansi, b.giabanle, c.name dvt, d.name name_ncc,e.name name_dm FROM kho a, hanghoa b, donvitinh c, nhacungcap d, danhmuc e WHERE tonkho>0 AND a.idHH=b.id AND b.idDVT=c.id AND b.idNCC=d.id AND b.idDM=e.id ${query}`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};


exports.listByDM = async (req, res, next) => {
    pool.execute(`SELECT COUNT(a.idHH) sl_sp, SUM(a.tonkho) sl_tonkho, SUM(a.daban) daban, c.name FROM kho a, hanghoa b, danhmuc c WHERE a.idHH=b.id AND b.idDM=c.id AND a.tonkho>0 GROUP BY c.id`, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

exports.listByNCC = async (req, res, next) => {
    pool.execute(`SELECT COUNT(a.idHH) sl_sp, SUM(a.tonkho) sl_tonkho, SUM(a.daban) daban, c.name FROM kho a, hanghoa b, nhacungcap c WHERE a.idHH=b.id AND b.idNCC=c.id AND a.tonkho>0 GROUP BY c.id
    `, (err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

exports.doanhso = async (req, res, next) => {
    pool.execute(`SELECT COUNT(idHH) sl_sp, SUM(tienvon) von, SUM(tienban) ban FROM doanhthu`,(err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};

exports.baoCaoDoanhso = async (req, res, next) => {
    pool.execute(`SELECT a.id, a.idHH, a.tienvon, a.tienban, b.name, c.tonkho FROM doanhthu a, hanghoa b, kho c WHERE a.idHH=b.id AND b.id=c.idHH`,(err, rows) => {
        if(err) return next(new BadRequestError(500, "Error"));
        res.send(rows);
    });
};
