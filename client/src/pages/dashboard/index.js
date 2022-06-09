import React from 'react'
import Sidebar from '../../components/dashboard/sidebar'

export default function Dashboard() {
  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar />
    </div>
  )
}
