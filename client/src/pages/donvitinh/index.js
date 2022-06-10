import React, { useEffect, useState } from 'react'
import Report from '../../components/dashboard/report';
import Sidebar from '../../components/dashboard/sidebar'
import Stats from '../../components/dashboard/stats';
import { timeNow } from '../../utils/getTime';

export default function Donvitinh() {
  const [time, setTime] = useState(timeNow());
  let tick = () => {
    setTime(timeNow());
  }
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  let Header = () => {
    return (
      <div>
          <h1 className='text-3xl font-semibold text-white leading-loose'>Đơn vị tính</h1>
          <div className='text-gray-200'>{time}</div>
      </div>
    )
  };


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
      <Sidebar active={2} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <Header />
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Danh Sách Đơn Vị Tính</h2>
            <button className='bg-pink-700 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-600 hover:shadow-pink leading-loose'>Thêm</button>
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
