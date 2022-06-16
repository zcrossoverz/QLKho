import React, { useEffect, useState } from 'react'
import { doanhso } from '../../services/khohangServices';
import currentcyFormat from '../../utils/currentcy';
export default function Stats() {

    const [data, setData] = useState({});

    const fetch = async () => {
        const res = await doanhso();
        setData(res[0]);
        // console.log(res);
    };

    useEffect(() => {
        fetch();
    },[]);

 
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
        <StatsCard value={data.sl_sp} title="Số lượng sản phẩm trong kho" />
        <StatsCard value={currentcyFormat(data.von)} title="Tổng vốn đầu tư" />
        <StatsCard value={currentcyFormat(data.ban)} title="Doanh số bán hàng" />
    </div>
  )
}
