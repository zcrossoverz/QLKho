import React from 'react'
// import Account from '../../components/dashboard/account';
import Report from '../../components/dashboard/report';
import Sidebar from '../../components/dashboard/sidebar'
import Stats from '../../components/dashboard/stats';

export default function Dashboard() {
  let Header = () => {
    return (
      <div>
          <h1 className='text-3xl font-semibold text-white leading-loose'>Dashboard</h1>
          <div className='text-gray-200'>Hello world</div>
      </div>
    )
  };

  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar active={0} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <Header />
        <hr className='border-gray-700' />
        <Stats />
        <Report />
      </div>
      {/* <div className='flex flex-col gap-y-6 pt-6 pr-6 w-96'>
      </div> */}
    </div>
  )
}
