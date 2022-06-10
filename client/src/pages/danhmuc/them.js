import Sidebar from '../../components/dashboard/sidebar'
import HeaderDashboard from '../../components/header'

export default function ThemDanhmuc() {



  return (
    <div className='flex w-full min-h-screen bg-gray-800 gap-y-4'>
      <Sidebar active={5} />
      <div className='flex flex-col flex-1 gap-6 p-4'>
        <HeaderDashboard title="Danh mục" />
        <hr className='border-gray-700' />
        <div className='p-6 bg-gray-900 rounded-lg'>
          <div className='flex justify-between items-center pb-4 w-full'>
            <h2 className='text-xl font-semibold leading-loose text-white'>Thêm Danh Mục Mới</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
