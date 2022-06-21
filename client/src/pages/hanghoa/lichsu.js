import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import * as hanghoaServices from "../../services/hanghoaServices";
import currentcyFormat from "../../utils/currentcy";
import sliceArray from "../../utils/sliceArray";
import * as khohangServices from "../../services/khohangServices";


export default function Lichsu() {

    let { id } = useParams();

    const [name, setName] = useState("");
    const [data, setData] = useState([[]]);
    const [dvt, setDVT] = useState("");
    const [currentPage, setcurrentPage] = useState(0);
    const [kho, setKho] = useState(0);


    const fetchHH = async () => {
        const res = await hanghoaServices.getOne(id);
        setName(res.name);
        setDVT(res.name_dvt);
        const ls = await hanghoaServices.getLichsu(id);
        const khodata = await khohangServices.getSPTonKho(id);
        setKho(khodata[0].tonkho);
        if(ls.length !== 0) setData(sliceArray(ls,7));
        console.log(khodata);
    }

    useEffect(() => {
        fetchHH();
    },[]);


  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={1} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Hàng hóa" />
        <hr className="border-gray-700" />
        <div className="p-6 bg-gray-900 rounded-lg w-full">
            <h2 className="text-xl font-semibold leading-loose text-white">Lịch sử nhập/xuất {name} - Tồn kho: {kho} {dvt}</h2>
            <hr className="bg-gray-300 mt-2 mb-4"/>
            <table className="w-full pt-4">
                <thead>
                    <tr>
                        <td className="text-white border-b border-gray-300 pt-2 pb-3">STT</td>
                        <td className="text-white border-b border-gray-300 pt-2 pb-3">ID đơn hàng</td>
                        <td className="text-white border-b border-gray-300 pt-2 pb-3">Hành động</td>
                        <td className="text-white border-b border-gray-300 pt-2 pb-3">Số lượng còn trong kho</td>
                        <td className="text-white border-b border-gray-300 pt-2 pb-3">Ghi chú</td>
                        <td className="text-white border-b border-gray-300 pt-2 pb-3">Thời gian</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data[currentPage].map((e,i) => {
                            return (
                                <tr className="text-white" key={e.id}>
                                    <td className="pt-2">{i+1}</td>
                                    <td className="pt-2">{e.idDH}</td>
                                    <td className="pt-2">{e.type === 1 ? 'Nhập':'Xuất'} {e.number} {dvt} {e.type === 1 ? 'vào kho':'khỏi kho'} với tổng số tiền {currentcyFormat(e.tien)}</td>
                                    <td className="pt-2">{e.kho} {dvt}</td>
                                    <td className="pt-2">{e.note}</td>
                                    <td className="pt-2">{e.time}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex justify-end w-full">
          <ReactPaginate
            pageCount={data.length}
            onPageChange={(e) => setcurrentPage(e.selected)}
            className="flex pt-4"
            nextLabel=">"
            previousLabel="<"
            activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            nextLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            pageLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          />
          </div>
        </div>
      </div>
    </div>
  );
}
