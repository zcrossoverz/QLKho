import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Donvitinh from "../pages/donvitinh";
import ThemDonvitinh from "../pages/donvitinh/them";
import Danhmuc from "../pages/danhmuc";
import ThemDanhmuc from "../pages/danhmuc/them";
import Donhang from "../pages/donhang";
import Hanghoa from "../pages/hanghoa";
import Khachhang from "../pages/khachhang";
import Nhacungcap from "../pages/nhacungcap";
import Taikhoan from "../pages/taikhoan";



const publicRoutes = [
    { path:"/login", component: Login },
    { path:"/", component: Dashboard },
    { path:"/donvitinh", component: Donvitinh },
    { path:"/donvitinh/them", component: ThemDonvitinh },
    { path:"/danhmuc", component: Danhmuc },
    { path:"/danhmuc/them", component: ThemDanhmuc },
    { path:"/donhang", component: Donhang },
    { path:"/hanghoa", component: Hanghoa },
    { path:"/khachhang", component: Khachhang },
    { path:"/nhacungcap", component: Nhacungcap },
    { path:"/taikhoan", component: Taikhoan },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };