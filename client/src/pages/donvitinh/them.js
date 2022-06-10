import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/dashboard/sidebar'
import HeaderDashboard from '../../components/header';

export default function ThemDonvitinh() {



  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar active={2} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <HeaderDashboard title="Đơn vị tính"/>
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Thêm Đơn Vị Tính</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
