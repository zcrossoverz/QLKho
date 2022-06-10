import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/sidebar'
import HeaderDashboard from '../../components/header';


export default function Danhmuc() {

  let navigate = useNavigate();


  let data = [
    { id:1, name:"Cai" },
    { id:1, name:"Cai" },
    { id:1, name:"Cai" },
    { id:1, name:"Cai" },
  ];

  let Item = (props) => {
    return (
      <tr>
        <td className='text-white'>
          {props.id}
        </td>
        <td className='text-white'>
          {props.name}
        </td>
        <td>
          Sua Xoa
        </td>
      </tr>
    );
  }

  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar active={5} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <HeaderDashboard title="Danh mục" />
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Danh Sách Danh Mục</h2>
            <button className='bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose' onClick={() => {
              navigate("/danhmuc/them", { replace:false });
            }}>Thêm</button>
          </div>
          <table className='w-full'>
            <thead className='text-sm font-semibold text-white'>
                <tr>
                    <td className='py-4 border-b border-gray-700'>ID</td>
                    <td className='py-4 border-b border-gray-700'>Tên</td>
                    <td className='py-4 border-b border-gray-700'>Hành động</td>
                </tr>
            </thead>
            <tbody>
              {data.map((e,i) => {
                return <Item id={e.id} name={e.name} key={i.toString} />
              })}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
