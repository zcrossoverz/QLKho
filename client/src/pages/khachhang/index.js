import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import * as khachhangServices from "../../services/khachhangServices";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { succesToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function Khachhang() {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const getListCustomer = async () => {
    try {
      const res = await khachhangServices.list();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListCustomer();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      const res = await khachhangServices.deleteCustomer(id);
      if (res.message === "success") {
        getListCustomer();
        succesToast("Xóa thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let Item = (props) => {
    return (
      <tr>
        <td className="text-white">{props.stt}</td>
        <td className="text-white">{props.name}</td>
        <td className="text-white">{props.sdt}</td>
        <td className="text-white">{props.diachi}</td>
        <td className="text-white">{props.email}</td>
        <td className="text-white">{props.ngayhoptac}</td>
        <td className="text-white flex items-center m-2">
          <button className="hover:text-green-600 p-4">
            <PencilIcon
              className="h-5"
              onClick={() => {
                navigate(`/khachhang/edit/${props.id}`, { replace: true });
              }}
            />
          </button>
          <button className="hover:text-red-600 p-4">
            <TrashIcon
              className="h-5"
              onClick={() => {
                deleteCustomer(props.id);
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
      <Sidebar active={4} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Khách hàng" />
        <hr className="border-gray-700" />
        <div className="flex gap-6">
          {/* list */}
          <div className="p-6 bg-gray-900 rounded-lg w-full">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Danh Sách Khách Hàng
              </h2>
              <button
                className="bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose"
                onClick={() => {
                  navigate("/khachhang/them", { replace: false });
                }}
              >
                Thêm
              </button>
            </div>
            <table className="w-full">
              <thead className="text-sm font-semibold text-white">
                <tr>
                  <td className="py-4 border-b border-gray-700">STT</td>
                  <td className="py-4 border-b border-gray-700">Tên</td>
                  <td className="py-4 border-b border-gray-700">SDT</td>
                  <td className="py-4 border-b border-gray-700">Địa chỉ</td>
                  <td className="py-4 border-b border-gray-700">Email</td>
                  <td className="py-4 border-b border-gray-700">
                    Ngày hợp tác
                  </td>
                  <td className="py-4 border-b border-gray-700">Hành động</td>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {
                  let date = new Date(e.ngayhoptac);
                  return (
                    <Item
                      stt={i + 1}
                      name={e.name}
                      key={e.id}
                      id={e.id}
                      sdt={e.sdt}
                      diachi={e.diachi}
                      email={e.email}
                      ngayhoptac={date.toDateString()}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* them  */}
        </div>
      </div>
    </div>
  );
}
