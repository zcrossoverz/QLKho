import React from 'react'

export default function Stats() {

    

 
    let StatsCard = (props) => {
        return (
        <div className='flex flex-col p-4 w-1/2 bg-gray-900 rounded-lg gap-y-3'>
                <div className='text-3xl font-semibold text-white'>
                    {props.value}
                </div>
                <div className='text-sm tracking-wide text-gray-500'>
                    {props.title}
                </div>
        </div>
        );
    }


  return (
    <div className='flex gap-6'>
        <StatsCard value="100000" title="Số lượng sản phẩm đang bán" />
        <StatsCard value="200000" title="Tổng vốn đầu tư" />
        <StatsCard value="100000" title="Doanh số bán hàng" />
        <StatsCard value="39999" title="Lợi nhuận thu về" />
    </div>
  )
}
