import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import formatDate from "../../utils/formatDay";
import { errorToast, succesToast } from "../../utils/toast";
import { validateEmail, validatePhone } from "../../utils/validator";
import * as nhacungcapServices from "../../services/nhacungcapServices";
import * as hanghoaServices from "../../services/hanghoaServices";
import * as donvitinhServices from "../../services/donvitinhServices";
import Select from "react-select";

export default function ThemDonnhap() {
 

  const [nhacungcapOptions, setNhacungcapOptions] = useState([]);
  const [hanghoaOptions, setHanghoaOptions] = useState([]);

  const [selectNCC, setSelectNCC] = useState(0);
  const [selectHH, setSelectHH] = useState({ value:0, label:'' });
  const [dongia, setDongia] = useState(0);
  const [num, setNum] = useState(0);
  const [dvt, setdvt] = useState('');

  const [listSP, setListSP] = useState([]);

  const fetchNCC = async () => {
    const res = await nhacungcapServices.list();
    let ncc = [];
    res.map((e) => {
        ncc.push({ value: e.id, label: e.name });
    })
    setNhacungcapOptions(ncc);
  };

  // check sp da them chua
  const deleteSP = (id) => {
    let hh = [];
    hanghoaOptions.map((e) => {
        if(e.value != id) hh.push(e);
    });
    setHanghoaOptions(hh);
  };

  const fetchHH = async () => {
    const res = await hanghoaServices.listByNCC(selectNCC);
    let hh = [];
    res.map((e) => {
        hh.push({ value: e.id, label: e.name });
    });
    setHanghoaOptions(hh);
  };

  const fetchInfoHH = async () => {
    const res = await hanghoaServices.getOne(selectHH.value);
    setDongia(res.gianhap);
    const res2 = await donvitinhServices.getOne(res.idDVT);
    setdvt(res2.name);
  };

  const addToListSP = () => {
    setListSP((e) => [...e, { name: selectHH.label, num, total: num*dongia, id:selectHH.value }]);
  };


  useEffect(() => {
    fetchNCC();
  }, []);

  useEffect(() => {
    fetchHH();
    setSelectHH({ value:0, label:'' });
    setListSP([]);
  }, [selectNCC]);

  useEffect(() => {
    fetchInfoHH();
  },[selectHH]);

  const handleForm = (e) => {
    e.preventDefault();

  };

  const chitietdonHandle = (e) => {
    e.preventDefault();
    addToListSP();
    deleteSP(selectHH.value);
  }

  let Item = (props) => {
    return (
        <tr className="text-white">
            <td>{props.stt}</td>
            <td>{props.name}</td>
            <td>{props.num}</td>
            <td>{props.total}</td>
            <td></td>
        </tr>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={6} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Kho hàng" />
        <hr className="border-gray-700" />
        <div className="flex">
          <div className="p-6 bg-gray-900 rounded-lg w-1/2 mr-4">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Thêm Đơn Nhập Hàng
              </h2>
            </div>
            <form className="mt-4 flex flex-col" onSubmit={handleForm}>
              <p className="text-white">Nhà cung cấp :</p>
              <Select
                className="my-2"
                options={nhacungcapOptions}
                onChange={(e) => setSelectNCC(e.value)}
              />

              <p className="text-white">Trạng thái :</p>
              <Select
                className="my-2 mb-4"
                options={[
                  { value: 1, label: "Đã thanh toán" },
                  { value: 2, label: "Chưa thanh toán" },
                ]}
              />

              <button
                type="submit"
                disabled={!true}
                className={
                  !true
                    ? "my-2 w-50 bg-gray-700 px-10 py-2 rounded-lg text-gray-100 leading-loose"
                    : "my-2 w-50 bg-pink-800 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-500 hover:shadow-pink leading-loose"
                }
              >
                Tạo đơn nhập
              </button>
            </form>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg w-1/2">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Chi Tiết Đơn
              </h2>
            </div>
            <form className="mt-4 flex flex-col" onSubmit={chitietdonHandle}>
            <p className="text-white">Sản phẩm :</p>
              <Select
                className="my-2"
                options={hanghoaOptions}
                value={selectHH}
                onChange={(e) => setSelectHH(e)}
              />
            <p className="text-white">Số lượng { !dvt ? '':`(${dvt})`}:</p>
            <input
                className="my-2 outline-none w-50 py-2 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />

            <p className="text-white">Đơn giá (k):</p>
            <input
                className="my-2 mb-4 outline-none w-50 py-2 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                value={dongia}
                onChange={(e) => setDongia(e.target.value)}
              />
            <button
                disabled={!true}
                type="submit"
                className={
                  !true
                    ? "my-2 w-50 bg-gray-700 px-10 py-2 rounded-lg text-gray-100 leading-loose"
                    : "my-2 w-50 bg-pink-800 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-500 hover:shadow-pink leading-loose"
                }
              >
                Thêm
              </button>
            </form>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
        <table className="w-full">
                <thead>
                    <tr className="text-white leading-loose">
                        <td>
                            STT
                        </td>
                        <td>
                            Tên hàng hóa
                        </td>
                        <td>
                            Số lượng
                        </td>
                        <td>
                            Tổng
                        </td>
                        <td>
                            Hành động
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        listSP.map((e,i) => {
                            return <Item stt={i} name={e.name} num={e.num} total={e.total} key={e.id} />
                        })
                    }
                </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
