import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import "react-datepicker/dist/react-datepicker.css";
import * as hanghoaServices from "../../services/hanghoaServices";
import * as donvitinhServices from "../../services/donvitinhServices";
import * as nhacungcapServices from "../../services/nhacungcapServices";
import * as danhmucServices from "../../services/danhmucServices";


import Select from "react-select";
import { errorToast, succesToast } from "../../utils/toast";

export default function ThemHanghoa() {


    const [name, setName] = useState("");
    const [gianhap, setGianhap] = useState(0);
    const [giabanle, setGiabanle] = useState(0);
    const [giabansi, setGiabansi] = useState(0);
    const [idDVT, setIdDVT] = useState(0);
    const [idNCC, setIdNCC] = useState(0);
    const [idDM, setIdDM] = useState(0);
    const [optionsDVT, setOptionsDVT] = useState([]);
    const [optionsNCC, setOptionsNCC] = useState([]);
    const [optionsDM, setOptionsDM] = useState([]);

    const fetchDVT = async () => {
        let res = await donvitinhServices.list();
        let options = [];
        res.map(e => {
            options.push({
                value: e.id,
                label: e.name
            })
        });
        setOptionsDVT(options);
    };

    const fetchNCC = async () => {
        let res = await nhacungcapServices.list();
        let options = [];
        res.map(e => {
            options.push({
                value: e.id,
                label: e.name
            })
        });
        setOptionsNCC(options);
    };

    const fetchDM = async () => {
        let res = await danhmucServices.list();
        let options = [];
        res.map(e => {
            options.push({
                value: e.id,
                label: e.name
            })
        });
        setOptionsDM(options);
    };

    useEffect(() => {
        fetchDVT();
        fetchDM();
        fetchNCC();
    }, []);


    const addNew = async (name, gianhap, giabansi, giabanle, idDVT, idNCC, idDM) => {
        const res = await hanghoaServices.create(name, gianhap, giabanle, giabansi, idNCC, idDVT, idDM);
        if(res.message === 'success'){
            succesToast("Th??m h??ng h??a th??nh c??ng!");
        }else if(res.message === 'exists'){
          errorToast("Tr??ng v???i t??n h??ng h??a c??!");
        }
    }

  const handleForm = (e) => {
    e.preventDefault();
    if(!name){
        errorToast("Ch??a nh???p t??n h??ng h??a");
    }else{
        addNew(name, gianhap, giabansi, giabanle, idDVT, idNCC, idDM);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={1} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="H??ng h??a" />
        <hr className="border-gray-700" />
        <div className="p-6 bg-gray-900 rounded-lg w-1/2">
          <div className="flex justify-between items-center pb-4 w-full">
            <h2 className="text-xl font-semibold leading-loose text-white">
              Th??m H??ng H??a
            </h2>
          </div>
          <form className="mt-4 flex" onSubmit={handleForm}>
            <div className="flex flex-col px-4 py-2">
              <p className="text-white">T??n :</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                onChange={(e) => setName(e.target.value)}
              />

              <p className="text-white">Gi?? nh???p (k) :</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                onChange={(e) => setGianhap(e.target.value)}
              />

              <p className="text-white">Gi?? b??n l??? (k):</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                onChange={(e) => setGiabanle(e.target.value)}
              />

              <p className="text-white">Gi?? b??n s??? (k) :</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                onChange={(e) => setGiabansi(e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4 py-2">
              <p className="text-white">????n v??? t??nh :</p>
              <Select
                options={optionsDVT}
                onChange={(e) => setIdDVT(e.value)}
                className="my-4 outline-none w-64 rounded-lg"
              />

              <p className="text-white">Nh?? cung c???p :</p>
              <Select
                options={optionsNCC}
                onChange={(e) => setIdNCC(e.value)}
                className="my-4 outline-none w-64 rounded-lg"
              />

              <p className="text-white">Danh m???c :</p>
              <Select
                options={optionsDM}
                onChange={(e) => setIdDM(e.value)}
                className="my-4 outline-none w-64 rounded-lg"
              />

              <button
                type="submit"
                disabled={!name}
                className={
                  !name
                    ? "w-44 bg-gray-700 px-10 py-2 rounded-lg text-gray-100 leading-loose"
                    : "w-44 bg-pink-800 px-10 py-2 rounded-lg text-pink-100 hover:text-white hover:bg-pink-500 hover:shadow-pink leading-loose"
                }
              >
                Th??m
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
