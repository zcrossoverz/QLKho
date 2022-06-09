import React from 'react'
import { LoginIcon,LogoutIcon } from '@heroicons/react/outline'


export default function Report() {


    let data = [
        {
            type: 1,
            nhanvien: "Nhân",
            time: "12-12-2022"
        },
        {
            type: 2,
            nhanvien: "Nhân",
            time: "12-12-2022"
        },
        {
            type: 2,
            nhanvien: "Nhân",
            time: "12-12-2022"
        },
    ];

    let Row = (props) => {
        return (
            <tr>
                <td className='py-4 flex items-center justify-center'>
                    {props.type === 1 ? <LoginIcon className='w-5 text-cyan-600' /> : <LogoutIcon className='w-5 text-violet-600' />}
                </td>
                <td className='py-4'>
                    {props.type === 1 ? "Xuất hàng cho khách" : "Nhập hàng vào kho" }
                </td>
                <td className='py-4'>{props.nhanvien}</td>
                <td className='py-4'>{props.time}</td>
            </tr>
        );
    }

  return (
    <div className='p-6 bg-gray-900 rounded-lg'>
        <div className='flex justify-between items-center pb-4'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Hoạt Động</h2>
        </div>
        <table className=' w-full'>
            <thead className='text-sm font-semibold text-white'>
                <tr>
                    <td className='py-4 border-b border-gray-700'></td>
                    <td className='py-4 border-b border-gray-700'>Hành động</td>
                    <td className='py-4 border-b border-gray-700'>Nhân viên</td>
                    <td className='py-4 border-b border-gray-700'>thời gian</td>
                </tr>
            </thead>
            <tbody className='text-sm text-gray-400'>
                {data.map((e,i) => {
                    return <Row type={e.type} nhanvien={e.nhanvien} time={e.time} key={i.toString()} />;
                })}
            </tbody>
        </table>
    </div>
  )
}
