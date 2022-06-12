import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../../components/dashboard/sidebar'
import HeaderDashboard from '../../components/header';
import * as danhmucServices from "../../services/danhmucServices";
import { succesToast } from '../../utils/toast';

export default function EditDanhmuc() {
  let { id } = useParams();

  const [name,setName] = useState("");
  const [newName, setNewName] = useState("");

  const getData = async () => {
    const res = await danhmucServices.getOne(id);
    setNewName(res.name);
    setName(res.name);
  };

  useEffect(() => {
    getData();
  },[]);

  const edit = async () => {
    const res = await danhmucServices.edit(id, newName);
    if(res.message === 'success') succesToast("Cập nhật thành công");
    getData();
  };




  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <ToastContainer />
      <Sidebar active={5} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <HeaderDashboard title="Danh mục"/>
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg w-1/3'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Sửa Thông tin Danh Mục</h2>
          </div>
          <div>
            <p className='text-white leading-loose'>ID</p>
            <input type="text" disabled={true} value={id} className='w-96 py-3 px-2 rounded-lg' />
            <p className='text-white leading-loose'>Tên</p>
            <input type="text" defaultValue={name} onChange={(e) => setNewName(e.target.value) } className='w-96 py-3 px-2 rounded-lg outline-none' />
            <button
                type="submit"
                disabled={ name === newName }
                className={ name === newName ? "bg-gray-700 mt-4 w-44 px-10 py-2 rounded-lg leading-loose":"mt-4 w-44 bg-cyan-900 px-10 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-400 hover:shadow-cyan leading-loose" }
                onClick={edit}
                >
                Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
