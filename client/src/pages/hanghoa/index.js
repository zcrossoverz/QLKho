import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import * as hanghoaServices from "../../services/hanghoaServices";
import { PencilIcon, PresentationChartBarIcon, TrashIcon } from "@heroicons/react/outline";

import { succesToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function Hanghoa() {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const getListObject = async () => {
    try {
      const res = await hanghoaServices.list();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListObject();
  }, []);
  
  
  const deleteObject = async (id) => {
    try {
      const res = await hanghoaServices.deleteObject(id);
      if (res.message === "success") {
        getListObject();
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
        <td className="text-white">{props.donvitinh}</td>
        <td className="text-white">{props.gianhap}</td>
        <td className="text-white">{props.giabansi}</td>
        <td className="text-white">{props.giabanle}</td>
        <td className="text-white">{props.nhacungcap}</td>
        <td className="text-white">{props.danhmuc}</td>
        <td className="text-white flex items-center m-2">
          <button className="hover:text-green-600 p-4">
            <PencilIcon
              className="h-5"
              onClick={() => {
                navigate(`/hanghoa/edit/${props.id}`, { replace: false });
              }}
            />
          </button>
          <button className="hover:text-blue-600 p-4">
            <PresentationChartBarIcon
              className="h-5"
              onClick={() => {
                navigate(`/hanghoa/lichsu/${props.id}`, { replace: false });
              }}
            />
          </button>
          <button className="hover:text-red-600 p-4">
            <TrashIcon
              className="h-5"
              onClick={() => {
                deleteObject(props.id);
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
      <Sidebar active={1} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Hàng hóa" />
        <hr className="border-gray-700" />
        <div className="flex gap-6">
          {/* list */}
          <div className="p-6 bg-gray-900 rounded-lg w-full">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Danh Sách Hàng Hóa
              </h2>
              <button
                className="bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose"
                onClick={() => {
                  navigate("/hanghoa/them", { replace: false });
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
                  <td className="py-4 border-b border-gray-700">Đơn vị tính</td>
                  <td className="py-4 border-b border-gray-700">Giá nhập (k)</td>
                  <td className="py-4 border-b border-gray-700">Giá bán sỉ (k)</td>
                  <td className="py-4 border-b border-gray-700">Giá bán lẻ (k)</td>
                  <td className="py-4 border-b border-gray-700">
                    Nhà cung cấp
                  </td>
                  <td className="py-4 border-b border-gray-700">Danh mục</td>
                  <td className="py-4 border-b border-gray-700">Hành động</td>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {

                  return (
                    <Item
                      stt={i + 1}
                      name={e.name}
                      key={e.id}
                      id={e.id}
                      gianhap={e.gianhap}
                      giabanle={e.giabanle}
                      giabansi={e.giabansi}
                      nhacungcap={e.name_ncc}
                      donvitinh={e.name_dvt}
                      danhmuc={e.name_dm}
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
