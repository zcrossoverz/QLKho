import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/sidebar'
import HeaderDashboard from '../../components/header';


export default function Nhacungcap() {

  let navigate = useNavigate();


  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar active={3} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <HeaderDashboard title="Nhà Cung Cấp" />
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Danh Sách Các Nhà Cung Cấp</h2>
            <button className='bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose' onClick={() => {
              navigate("/khachhang/them", { replace:false });
            }}>Thêm</button>
          </div>
        </div>
      </div>
    </div>
  )
}
