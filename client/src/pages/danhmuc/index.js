import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import * as danhmucService from "../../services/danhmucServices";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { succesToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function Danhmuc() {
  let navigate = useNavigate();



  const [data, setData] = useState([]);
  const getListUnit = async () => {
    try {
      const res = await danhmucService.list();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListUnit();
  }, []);


  const [newUnit, setNewUnit] = useState('');

  const addUnit = (e) => {
    e.preventDefault();
    const addNewUnit = async (name) => {
      try {
        const res = await danhmucService.create(name);
        if(res.message === 'success') {
          succesToast("Thêm danh mục thành công!!");
          getListUnit();
        }
      } catch (error) {
        console.log(error);
      }
    };
    addNewUnit(newUnit);
    setNewUnit('');
  };


  const deleteCategory = async (id) => {
    try {
      const res = await danhmucService.deleteCategory(id);
      if(res.message === 'success') {
        getListUnit();
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
            <PencilIcon className="h-5" />
          </button>
          <button className="hover:text-red-600 p-4">
            <TrashIcon className="h-5" onClick={() => {
              deleteCategory(props.id);
            }} />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <Sidebar active={5} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Danh mục" />
        <ToastContainer />
        <hr className="border-gray-700" />
        <div className="flex gap-6">

          {/* list */}
          <div className="p-6 bg-gray-900 rounded-lg w-1/2">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Danh Sách Danh Mục
              </h2>

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
          <div className="p-6 bg-gray-900 rounded-lg w-1/2">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Thêm Danh Mục
              </h2>
            </div>
              <form className="mt-4 flex flex-col" onSubmit={addUnit}>
                <p className="text-white">Tên danh mục:</p>
                <input className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100" 
                  value={newUnit}
                  onChange={(e) => {
                    setNewUnit(e.target.value);
                 }}/>
                <button
                type="submit"
                disabled={!newUnit}
                className={!newUnit ? "w-44 bg-gray-700 px-10 py-2 rounded-lg text-gray-100 leading-loose" : "w-44 bg-pink-800 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-500 hover:shadow-pink leading-loose" }>
                Thêm
              </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
