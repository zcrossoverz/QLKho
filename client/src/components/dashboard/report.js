import React, { useEffect, useState } from "react";
import {
  ClipboardListIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import * as khohangService from "../../services/khohangServices";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import sliceArray from "../../utils/sliceArray";

export default function Report() {
  let navigate = useNavigate();

  const [data, setData] = useState([[]]);
  const [currentPage, setcurrentPage] = useState(0);

  const fetch = async () => {
    const res = await khohangService.listFull();
    if(res.length !== 0) setData(sliceArray(res, 7));
  };
  useEffect(() => {
    fetch();
  }, []);

  let Row = (props) => {
    return (
      <tr>
        <td className="py-4 flex items-center justify-center">
          {props.type === 2 ? (
            <LoginIcon className="w-5 text-cyan-600" />
          ) : (
            <LogoutIcon className="w-5 text-violet-600" />
          )}
        </td>
        <td className="py-4">
          {props.type === 2 ? "Xuất hàng cho khách" : "Nhập hàng vào kho"}
        </td>
        <td className="py-4">DH{props.id}</td>
        <td className="py-4">{props.note}</td>
        <td className="py-4">{props.time}</td>
        <td className="py-4">
          <button>
            <ClipboardListIcon
              className="h-5 text-pink-500"
              onClick={() =>
                navigate(`/khohang/don/${props.id}`, { replace: false })
              }
            />
          </button>
        </td>
      </tr>
    );
  };

  const handlePageClick = (e) => {
    setcurrentPage(e.selected);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-xl font-semibold leading-loose text-white">
          Hoạt Động
        </h2>
      </div>
      <table className="w-full">
        <thead className="text-sm font-semibold text-white">
          <tr>
            <td className="py-4 border-b border-gray-700"></td>
            <td className="py-4 border-b border-gray-700">Hành động</td>
            <td className="py-4 border-b border-gray-700">Mã đơn</td>
            <td className="py-4 border-b border-gray-700">Ghi chú</td>
            <td className="py-4 border-b border-gray-700">Thời gian</td>
            <td className="py-4 border-b border-gray-700">Xem chi tiết</td>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-400">
          {data[currentPage].map((e, i) => {
            let date = new Date(e.time);
            return (
              <Row
                type={e.type}
                id={e.id}
                note={e.note}
                time={date.toLocaleDateString()}
                key={i.toString()}
              />
            );
          })}
        </tbody>
      </table>
          <div className="flex justify-end w-full mt-4">
          <ReactPaginate
            pageCount={data.length}
            onPageChange={handlePageClick}
            className="flex"
            nextLabel=">"
            previousLabel="<"
            activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            nextLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            pageLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          />
          </div>
    </div>
  );
}
