import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import * as nhacungcapServices from "../../services/nhacungcapServices";
import { ClipboardListIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { succesToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function Danhmuc() {
  let navigate = useNavigate();



  const [data, setData] = useState([]);
  const getListProvider = async () => {
    try {
      const res = await nhacungcapServices.list();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListProvider();
  }, []);




  const deleteCategory = async (id) => {
    try {
      const res = await nhacungcapServices.deleteProvider(id);
      if(res.message === 'success') {
        getListProvider();
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
        <td className="text-white flex items-center m-2">
          <button className="hover:text-green-600 p-4">
            <PencilIcon className="h-5"
            onClick={() => {
              navigate(`/nhacungcap/edit/${props.id}`, { replace:true });
            }}

            />
          </button>
          <button className="hover:text-red-600 p-4">
            <TrashIcon className="h-5" onClick={() => {
              deleteCategory(props.id);
            }} />
          </button>
          <button className="hover:text-blue-600 p-4">
            <ClipboardListIcon className="h-5" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={3} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Nhà cung cấp" />
        <hr className="border-gray-700" />
        <div className="flex gap-6">

          {/* list */}
          <div className="p-6 bg-gray-900 rounded-lg w-full">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Danh Sách Nhà Cung Cấp
              </h2>
              <button className='bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose' onClick={() => {
                navigate("/nhacungcap/them", { replace:false });
              }}>Thêm</button>
            </div>
            <table className="w-full">
              <thead className="text-sm font-semibold text-white">
                <tr>
                  <td className="py-4 border-b border-gray-700">STT</td>
                  <td className="py-4 border-b border-gray-700">Tên</td>
                  <td className="py-4 border-b border-gray-700">Hành động</td>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {
                  return <Item stt={i + 1} name={e.name} key={e.id} id={e.id} />;
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
