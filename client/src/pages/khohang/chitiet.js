import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import { ToastContainer } from "react-toastify";
import * as khohangService from "../../services/khohangServices";
import * as nhacungcapServices from "../../services/nhacungcapServices";
import * as khachhangServices from "../../services/khachhangServices";
import { useReactToPrint } from 'react-to-print';
import { PrintHoadon } from "./print";

import { useParams } from "react-router-dom";
import { errorToast, succesToast } from "../../utils/toast";
import currentcyFormat from "../../utils/currentcy";

export default function ChitietDon() {
  let { id } = useParams();

  const [chitiet, setChitiet] = useState({});
  const [data, setData] = useState([]);
  const [time, setTime] = useState(new Date());
  const [name2, setName2] = useState("");
  const [amount, setAmount] = useState(0);


  

  const fetchDon = async () => {
    const res = await khohangService.getInfoDon(id);
    setChitiet(res.info[0]);
    let d = [];
    let am = 0;
    // console.log(res);
    res.data.map((e) => {
      d.push({ id: e.idHH, num: e.soluong, total: e.gia, name: e.name, dvt: e.dvt });
      am += e.gia;
    });
    setData(d);
    setAmount(am);
    setTime(new Date(res.info[0].time));
    if (res.info[0].type === 1) {
      const n = await nhacungcapServices.getOne(res.info[0].id2);
      setName2(n.name);
    } else {
      if (res.info[0].id2) {
        const n = await khachhangServices.getOne(res.info[0].id2);
        setName2(n.name);
      } else {
        setName2("Khách bán lẻ");
      }
    }
    // console.log(res);
  };

  const componentRef = useRef();
  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    fetchDon();
  }, []);

  const thanhtoan = async () => {
    const res = await khohangService.thanhtoan(chitiet.id);
    if (res.message === "success") {
      succesToast("Đã thanh toán!");
    } else {
      errorToast("Thanh toán thất bại!");
    }
  };

  let Item = (props) => {
    return (
      <tr className="text-white">
        <td className="pt-4">{props.stt + 1}</td>
        <td className="pt-4">{props.name}</td>
        <td className="pt-4">{props.num}</td>
        <td className="pt-4">{currentcyFormat(props.total)}</td>
      </tr>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={6} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Kho hàng" />
        <hr className="border-gray-700" />
        <div className="w-full bg-gray-900 px-4 py-6 rounded-lg">
          <h2 className="text-white leading-loose font-semibold text-xl w-full">
            Chi tiết đơn
          </h2>
          <hr className="bg-gray-300 mt-2" />
          <div className="flex">
            <div className="flex flex-col text-white w-1/2">
              <p className="leading-loose mt-4 font-semibold">
                Mã đơn: <span className="font-normal">DH{chitiet.id}</span>
              </p>
              <p className="leading-loose mt-4 font-semibold">
                Trạng thái:{" "}
                {chitiet.status === 1 ? (
                  <span className="font-normal text-green-400">
                    đã thanh toán
                  </span>
                ) : (
                  <span className="font-normal text-red-400">
                    chưa thanh toán
                  </span>
                )}
              </p>
              <p className="leading-loose mt-4 font-semibold">
                Ghi chú: <span className="font-normal">{chitiet.note}</span>
              </p>
            </div>
            <div className="flex flex-col text-white w-1/2">
              <p className="leading-loose mt-4 font-semibold">
                Loại đơn:{" "}
                {chitiet.type === 1 ? (
                  <span className="font-normal text-blue-400">đơn nhập</span>
                ) : (
                  <span className="font-normal text-violet-400">đơn xuất</span>
                )}
              </p>
              <p className="leading-loose mt-4 font-semibold">
                {chitiet.type === 1 ? "Nhà cung cấp" : "Khách hàng"}:{" "}
                <span className="font-normal">{name2}</span>
              </p>
              <p className="leading-loose mt-4 font-semibold">
                Thời gian:{" "}
                <span className="font-normal">{time.toLocaleDateString()}</span>
              </p>
              {chitiet.status === 2 ? (
                <button
                  className="bg-violet-600 py-2 px-4 w-52 rounded-lg mt-4"
                  onClick={thanhtoan}
                >
                  Đánh dấu thanh toán
                </button>
              ) : (
                <div>
                  <div className="hidden"><PrintHoadon 
                  ref={componentRef} type={chitiet.type} name2={name2} data={data} id={chitiet.id} note={chitiet.note} time={chitiet.time} /></div>
                <button
                className="bg-blue-600 py-2 px-4 w-52 rounded-lg mt-4"
                onClick={print}
              >
                In đơn
              </button>
              </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-900 px-4 py-6 rounded-lg">
          <h2 className="text-white text-xl font-semibold">Thông Tin</h2>
          <hr className="bg-gray-400 mt-4" />
          <table className="text-white w-full">
            <thead className="pb-4">
              <tr className="leading-loose font-semibold">
                <td className="py-4 border-b border-gray-700">STT</td>
                <td className="py-4 border-b border-gray-700">Tên</td>
                <td className="py-4 border-b border-gray-700">Số lượng</td>
                <td className="py-4 border-b border-gray-700">Giá</td>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <Item
                  stt={i}
                  name={e.name}
                  num={e.num}
                  total={e.total}
                  key={e.id}
                />
              ))}
              <tr className="text-white">
                <td></td>
                <td></td>
                <td></td>
                <td className="pt-4 leading-loose font-semibold">
                  Tổng: {currentcyFormat(amount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
