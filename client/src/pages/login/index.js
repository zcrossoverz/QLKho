import React from 'react'
import { useState } from 'react'

export default function Login() {
    const [info, setInfo] = useState({username:'', password:''});

    let submitHandler = (e) => {
        e.preventDefault();
        console.log(info);
    }

  return (
    <form onSubmit={submitHandler}>
        <div className='flex items-center justify-center h-screen bg-gray-200'>
            <div className='bg-white w-96 p-6 rounded shadow-sm'>
                <div className='flex items-center justify-center mb-8'>
                    <img src={require("../../assets/images/login/lock.png")} className='h-32' alt='lock' />
                </div>
                <label className='text-gray-700'>Tên đăng nhập</label>
                <input type='text' className='w-full py-2 bg-gray-100 rounded text-gray-500 px-1 outline-none mb-4' onChange={(e) => setInfo({...info, username: e.target.value})} value={info.username} />
                <label className='text-gray-700'>Mật khẩu</label>
                <input type='password' className='w-full py-2 bg-gray-100 rounded text-gray-500 px-1 outline-none mb-4' onChange={(e) => setInfo({...info, password: e.target.value})} value={info.password} />
                <button type='submit' className='bg-red-400 w-full text-gray-100 py-2 rounded hover:bg-red-500 transition-colors' >Đăng nhập</button>
            </div>
        </div>
    </form>
  )
}
