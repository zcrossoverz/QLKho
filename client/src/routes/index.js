import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Donvitinh from "../pages/donvitinh";
import Danhmuc from "../pages/danhmuc";
import Donhang from "../pages/donhang";
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



const publicRoutes = [
    { path:"/login", component: Login },
    { path:"/", component: Dashboard },
    { path:"/donvitinh", component: Donvitinh },
    { path:"/donvitinh/edit/:id", component: EditDonvitinh },
    { path:"/danhmuc", component: Danhmuc },
    { path:"/danhmuc/edit/:id", component: EditDanhmuc },
    { path:"/donhang", component: Donhang },
    { path:"/hanghoa", component: Hanghoa },
    { path:"/hanghoa/them", component: ThemHanghoa },
    { path:"/hanghoa/edit/:id", component: EditHanghoa },
    { path:"/khachhang", component: Khachhang },
    { path:"/khachhang/them", component: ThemKhachhang },
    { path:"/khachhang/edit/:id", component: EditKhachhang },
    { path:"/nhacungcap", component: Nhacungcap },
    { path:"/nhacungcap/them", component: ThemNhacungcap },
    { path:"/nhacungcap/edit/:id", component: EditNhacungcap },
    { path:"/taikhoan", component: Taikhoan },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };