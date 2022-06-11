import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/dashboard/sidebar'
import HeaderDashboard from '../../components/header';

export default function EditDonvitinh() {
  let { id } = useParams();


  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar active={2} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <HeaderDashboard title="Đơn vị tính"/>
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg w-1/3'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Sửa Đơn Vị Tính</h2>
          </div>
          <div>
            <p className='text-white leading-loose'>ID</p>
            <input type="text" disabled={true} value={id} className='w-96 py-3 px-2 rounded-lg' />
            <p className='text-white leading-loose'>Tên</p>
            <input type="text" value={id} className='w-96 py-3 px-2 rounded-lg outline-none' />
            <button
                type="submit"
                className="mt-4 w-44 bg-cyan-900 px-10 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-400 hover:shadow-cyan leading-loose">
                Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
