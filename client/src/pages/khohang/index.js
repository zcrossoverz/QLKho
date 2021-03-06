import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import Stats from "../../components/khohang/stats";
import * as khohangServices from "../../services/khohangServices";
import { DocumentTextIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { succesToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import sliceArray from "../../utils/sliceArray";
import ReactPaginate from "react-paginate";


export default function Khohang() {
  let navigate = useNavigate();

  const [listdonnhap, setListdonnhap] = useState([[]]);
  const [listdonxuat, setListdonxuat] = useState([[]]);
  const [currentPagenhap, setcurrentPagenhap] = useState(0);
  const [currentPagexuat, setcurrentPagexuat] = useState(0);


  const getListNhap = async () => {
    const res = await khohangServices.listNhap();
    if(res.length !==0 ) setListdonnhap(sliceArray(res,5));
  };

  const getListXuat = async () => {
    const res = await khohangServices.listXuat();
    if(res.length !== 0) setListdonxuat(sliceArray(res,5));
  };

  useEffect(() => {
    getListNhap();
    getListXuat();
  }, []);

  const deleteDon = async (id, isNhap) => {
    const res = await khohangServices._delete(id);
    if (res.message === "success") {
      if(isNhap) getListNhap();
      else getListXuat();
      succesToast("Xoá đơn thành công!");
    }
  };

  let Item = (props) => {
    return (
      <tr>
        <td className="text-white">DH{props.id}</td>
        <td className="text-white">{props.status===1? <p className="text-green-400">đã thanh toán</p>:<p className="text-red-400">chưa thanh toán</p>}</td>
        <td className="text-white">{props.note}</td>
        <td className="text-white">{props.time}</td>
        <td className="text-white flex items-center m-2">
          <button className="hover:text-green-600 p-4">
            <DocumentTextIcon
              className="h-5"
              onClick={() => {
                navigate(`/khohang/don/${props.id}`, { replace: false });
              }}
            />
          </button>
          <button className="hover:text-red-600 p-4">
            <TrashIcon
              className="h-5"
              onClick={() => {
                deleteDon(props.id, props.isNhap);
              }}
            />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={6} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Kho hàng" />
        <hr className="border-gray-700" />
        <Stats />

        <div className="flex">
          <div className="p-6 bg-gray-900 rounded-lg w-1/2 mr-4">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Đơn Nhập Kho
              </h2>
              <button
                className="bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose"
                onClick={() => {
                  navigate("/khohang/donnhap/them", { replace: false });
                }}
              >
                Thêm
              </button>
            </div>
            <table className="w-full">
              <thead className="text-sm font-semibold text-white">
                <tr>
                  <td className="py-4 border-b border-gray-700">Mã đơn</td>
                  <td className="py-4 border-b border-gray-700">Trạng thái</td>
                  <td className="py-4 border-b border-gray-700">Ghi chú</td>
                  <td className="py-4 border-b border-gray-700">Thời gian</td>
                  <td className="py-4 border-b border-gray-700">Hành động</td>
                </tr>
              </thead>
              <tbody>
                {listdonnhap[currentPagenhap].map((e) => {
                  let time = new Date(e.time);
                  return (
                    <Item
                      id={e.id}
                      status={e.status}
                      key={e.id}
                      note={e.note}
                      isNhap={true}
                      time={time.toLocaleDateString()}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end w-full">
          <ReactPaginate
            pageCount={listdonnhap.length}
            onPageChange={(e) => setcurrentPagenhap(e.selected)}
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

          <div className="p-6 bg-gray-900 rounded-lg w-1/2 ml-4">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Đơn Xuất Kho
              </h2>
              <button
                className="bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose"
                onClick={() => {
                  navigate("/khohang/donxuat/them", { replace: false });
                }}
              >
                Thêm
              </button>
            </div>
            <table className="w-full">
              <thead className="text-sm font-semibold text-white">
                <tr>
                  <td className="py-4 border-b border-gray-700">Mã đơn</td>
                  <td className="py-4 border-b border-gray-700">Trạng thái</td>
                  <td className="py-4 border-b border-gray-700">Ghi chú</td>
                  <td className="py-4 border-b border-gray-700">Thời gian</td>
                  <td className="py-4 border-b border-gray-700">Hành động</td>
                </tr>
              </thead>
              <tbody>
                {listdonxuat[currentPagexuat].map((e) => {
                  let time = new Date(e.time);
                  return (
                    <Item
                      id={e.id}
                      status={e.status}
                      key={e.id}
                      note={e.note}
                      time={time.toLocaleDateString()}
                      isNhap={false}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end w-full">
          <ReactPaginate
            pageCount={listdonxuat.length}
            onPageChange={(e) => setcurrentPagexuat(e.selected)}
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
    </div>
  );
}
