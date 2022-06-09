import React from 'react'

export default function Account() {
  return (
    <div className='flex flex-col p-6 bg-gray-900 rounded-lg'>
        <div className='flex justify-between'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Xin chào <span className='font-bold'>Admin</span>!</h2>
            <div className='text-sm leading-loose text-red-300'>Logout</div>
        </div>
    </div>
  )
}
