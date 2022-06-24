import Dashboard from "../pages/dashboard";
import Donvitinh from "../pages/donvitinh";
import Danhmuc from "../pages/danhmuc";
import Hanghoa from "../pages/hanghoa";
import Khachhang from "../pages/khachhang";
import Nhacungcap from "../pages/nhacungcap";
import Taikhoan from "../pages/taikhoan";
import EditDonvitinh from "../pages/donvitinh/edit";
import EditDanhmuc from "../pages/danhmuc/edit";
import EditNhacungcap from "../pages/nhacungcap/edit";
import ThemNhacungcap from "../pages/nhacungcap/them";
import ThemKhachhang from "../pages/khachhang/them";
import EditKhachhang from "../pages/khachhang/edit";
import ThemHanghoa from "../pages/hanghoa/them";
import EditHanghoa from "../pages/hanghoa/edit";
import Khohang from "../pages/khohang";
import ThemDonnhap from "../pages/khohang/themdonnhap";
import ThemDonxuat from "../pages/khohang/themdonxuat";
import ChitietDon from "../pages/khohang/chitiet";
import Baocao from "../pages/baocao";
import Lichsu from "../pages/hanghoa/lichsu";



const publicRoutes = [
    { path:"/", component: Dashboard },
    { path:"/donvitinh", component: Donvitinh },
    { path:"/donvitinh/edit/:id", component: EditDonvitinh },
    { path:"/danhmuc", component: Danhmuc },
    { path:"/danhmuc/edit/:id", component: EditDanhmuc },
    { path:"/khohang", component: Khohang },
    { path:"/khohang/don/:id", component: ChitietDon },
    { path:"/khohang/donnhap/them", component: ThemDonnhap },
    { path:"/khohang/donxuat/them", component: ThemDonxuat },
    { path:"/hanghoa", component: Hanghoa },
    { path:"/hanghoa/them", component: ThemHanghoa },
    { path:"/hanghoa/edit/:id", component: EditHanghoa },
    { path:"/hanghoa/lichsu/:id", component: Lichsu },
    { path:"/khachhang", component: Khachhang },
    { path:"/khachhang/them", component: ThemKhachhang },
    { path:"/khachhang/edit/:id", component: EditKhachhang },
    { path:"/nhacungcap", component: Nhacungcap },
    { path:"/nhacungcap/them", component: ThemNhacungcap },
    { path:"/nhacungcap/edit/:id", component: EditNhacungcap },
    { path:"/taikhoan", component: Taikhoan },
    { path:"/baocao", component: Baocao },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };