import React, { useEffect, useState } from 'react'
import * as khohangServices from "../../services/khohangServices";

export default function Stats() {

 
  const [kho, setKho] = useState([]);
  const [loai, setLoai] = useState(0);
  const [ton, setTon] = useState(0);
  const [daban, setDaban] = useState(0);
  const [chuatt, setchuatt] = useState(0);

  const fetchKho = async () => {
    const res = await khohangServices.getTonKho();
    setKho(res);
    let t_loai = 0;
    let t_ton = 0;
    let t_daban = 0;
    res.map(e => {
        t_loai++;
        t_ton += e.tonkho;
        t_daban += e.daban;
    });
    setLoai(t_loai);
    setTon(t_ton);
    setDaban(t_daban);
    const res2 = await khohangServices.getDonChuaTT();
    setchuatt(res2.length);
  };


  useEffect(() => {
    fetchKho();
  }, []);

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
        <StatsCard value={loai} title="Số sản phẩm tồn kho" />
        <StatsCard value={ton} title="Số lượng tồn kho" />
        <StatsCard value={daban} title="Tổng số sản phẩm đã bán" />
        <StatsCard value={chuatt} title="Tổng số đơn chưa thanh toán" />
    </div>
  )
}
