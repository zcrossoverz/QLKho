import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import "react-datepicker/dist/react-datepicker.css";
import { errorToast, succesToast } from "../../utils/toast";
import * as nhacungcapServices from "../../services/nhacungcapServices";
import * as hanghoaServices from "../../services/hanghoaServices";
import * as donvitinhServices from "../../services/donvitinhServices";
import * as khohangServices from "../../services/khohangServices";
import Select from "react-select";
import { TrashIcon } from "@heroicons/react/outline";
import currentcyFormat from "../../utils/currentcy";

export default function ThemDonnhap() {
 

  const [nhacungcapOptions, setNhacungcapOptions] = useState([]);
  const [hanghoaOptions, setHanghoaOptions] = useState([]);

  const [selectNCC, setSelectNCC] = useState(0);
  const [selectHH, setSelectHH] = useState({ value:0, label:'' });
  const [dongia, setDongia] = useState(0);
  const [num, setNum] = useState(0);
  const [dvt, setdvt] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState(0);
  const [note, setNote] = useState('');

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
    if(res.idDVT!==undefined){
      const res2 = await donvitinhServices.getOne(res.idDVT);
      setdvt(res2.name);
    }
  };

  const addToListSP = () => {
    setTotalPrice(totalPrice+(num*dongia));
    setListSP((e) => [...e, { name: selectHH.label, num, total: num*dongia, id:selectHH.value }]);
  };


  useEffect(() => {
    fetchNCC();
  }, []);

  useEffect(() => {
    fetchHH();
    setSelectHH({ value:0, label:'' });
    setListSP([]);
    setTotalPrice(0);
  }, [selectNCC]);

  useEffect(() => {
    fetchInfoHH();
  },[selectHH]);

  const addNew = async () => {
    let info = [];
    listSP.map(e => {
      info.push({
        idHH: e.id,
        soluong: e.num,
        gia: e.total
      })
    });
    const res = await khohangServices.taoDonHang(1, status, note, selectNCC, info);
    if(res.message === 'success') {
      succesToast('Th??m th??nh c??ng!');
      setStatus(0);
      setNote('');
      setSelectNCC(0);
      setListSP([]);
    }else{
      errorToast('???? c?? l???i x???y ra!')
    }
  }

  const handleForm = (e) => {
    e.preventDefault();
    if(listSP.length !== 0) addNew();
    else errorToast('????n h??ng tr???ng!');
  };

  const chitietdonHandle = (e) => {
    e.preventDefault();
    addToListSP();
    deleteSP(selectHH.value);
  };

  const removeItem = (id) => {
    let t = [];
    listSP.forEach(e => {
      if(e.id !== id) t.push(e);
      else{
        setHanghoaOptions([...hanghoaOptions, { value:e.id, label:e.name }]);
        setTotalPrice(totalPrice - e.total);
      }
    });
    setListSP(t);
  }

  let Item = (props) => {
    return (
        <tr className="text-white">
            <td>{props.stt}</td>
            <td>{props.name}</td>
            <td>{props.num}</td>
            <td>{currentcyFormat(props.total)}</td>
            <td>
              <button className="hover:text-red-600 p-4">
              <TrashIcon
                className="h-5"
                onClick={() => {
                  removeItem(props.id);
                }}
              />
            </button>
            </td>
        </tr>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={6} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Kho h??ng" />
        <hr className="border-gray-700" />
        <div className="flex">
          <div className="p-6 bg-gray-900 rounded-lg w-1/2 mr-4">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Th??m ????n Nh???p H??ng
              </h2>
            </div>
            <form className="mt-4 flex flex-col" onSubmit={handleForm}>
              <p className="text-white">Nh?? cung c???p :</p>
              <Select
                className="my-2"
                options={nhacungcapOptions}
                onChange={(e) => setSelectNCC(e.value)}
              />

              <p className="text-white">Tr???ng th??i :</p>
              <Select
                className="my-2 mb-4"
                options={[
                  { value: 1, label: "???? thanh to??n" },
                  { value: 2, label: "Ch??a thanh to??n" },
                ]}
                onChange={(e) => setStatus(e.value)}
              />
              <p className="text-white">Ghi ch??:</p>
              <textarea className="w-50 my-4 rounded-lg p-4 outline-none" placeholder="..." onChange={(e) => setNote(e.target.value)}/>

              <button
                type="submit"
                disabled={!status || !selectNCC || !note}
                className={
                  !status || !selectNCC || !note
                    ? "my-2 w-50 bg-gray-700 px-10 py-2 rounded-lg text-gray-100 leading-loose"
                    : "my-2 w-50 bg-pink-800 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-500 hover:shadow-pink leading-loose"
                }
              >
                T???o ????n nh???p
              </button>
            </form>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg w-1/2">
            <div className="flex justify-between items-center pb-4 w-full">
              <h2 className="text-xl font-semibold leading-loose text-white">
                Chi Ti???t ????n
              </h2>
            </div>
            <form className="mt-4 flex flex-col" onSubmit={chitietdonHandle}>
            <p className="text-white">S???n ph???m :</p>
              <Select
                className="my-2"
                options={hanghoaOptions}
                value={selectHH}
                onChange={(e) => setSelectHH(e)}
              />
            <p className="text-white">S??? l?????ng { !dvt ? '':`(${dvt})`}:</p>
            <input
                className="my-2 outline-none w-50 py-2 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />

            <p className="text-white">????n gi?? (k):</p>
            <input
                className="my-2 mb-4 outline-none w-50 py-2 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                value={dongia}
                onChange={(e) => setDongia(e.target.value)}
              />
            <button
                disabled={hanghoaOptions.length<=0}
                type="submit"
                className={
                  hanghoaOptions.length<=0
                  ? "bg-gray-700 mt-4 w-50 px-10 py-2 rounded-lg leading-loose"
                  : "mt-4 w-50 bg-cyan-900 px-10 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-400 hover:shadow-cyan leading-loose"
                }
              >
                Th??m
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
                            T??n h??ng h??a
                        </td>
                        <td>
                            S??? l?????ng
                        </td>
                        <td>
                            T???ng
                        </td>
                        <td>
                            H??nh ?????ng
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                      
                        listSP.map((e,i) => {
                            return <Item stt={i} id={e.id} name={e.name} num={e.num} total={e.total} key={e.id} />
                        })
                    }
                    {
                      listSP.length > 0 ? (
                        <tr className>
                          <td>
                          </td>
                          <td>

                          </td>
                          <td>

                          </td>
                          <td className="text-white font-semibold leading-loose">
                            T???ng: { 
                            currentcyFormat(totalPrice)
                            }
                          
                          </td>
                        </tr>
                      ):''
                    }
                </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
