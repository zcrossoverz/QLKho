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
import { useParams } from "react-router-dom";

export default function EditHanghoa() {


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

    const [oldDVT, setOldDVT] = useState({});
    const [oldNCC, setOldNCC] = useState({});
    const [oldDM, setOldDM] = useState({});

    let { id } = useParams();

    const fetchDVT = async () => {
        let res = await donvitinhServices.list();
        let options = [];
        res.map(e => {
            options.push({
                value: e.id,
                label: e.name
            });

            if(e.id === idDVT) setOldDVT({ value: e.id, label: e.name });
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
            });
            if(e.id === idNCC) setOldNCC({ value: e.id, label: e.name });
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
            });
            if(e.id === idDM) setOldDM({ value: e.id, label: e.name });
        });
        setOptionsDM(options);
    };

    const fetchDataOld = async () => {
        const res = await hanghoaServices.getOne(id);
        setName(res.name);
        setGianhap(res.gianhap);
        setGiabanle(res.giabanle);
        setGiabansi(res.giabansi);
        setIdDVT(res.idDVT);
        setIdNCC(res.idNCC);
        setIdDM(res.idDM);
    }

    useEffect(() => {
        fetchDVT();
        fetchDM();
        fetchNCC();
        fetchDataOld();
    }, []);


    const addNew = async (name, gianhap, giabansi, giabanle, idDVT, idNCC, idDM) => {
        const res = await hanghoaServices.create(name, gianhap, giabanle, giabansi, idNCC, idDVT, idDM);
        if(res.message === 'success'){
            succesToast("Thêm hàng hóa thành công!");
        }
    }

  const handleForm = (e) => {
    e.preventDefault();
    if(!name){
        errorToast("Chưa nhập tên hàng hóa");
    }else{
        addNew(name, gianhap, giabansi, giabanle, idDVT, idNCC, idDM);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={1} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Hàng hóa" />
        <hr className="border-gray-700" />
        <div className="p-6 bg-gray-900 rounded-lg w-1/2">
          <div className="flex justify-between items-center pb-4 w-full">
            <h2 className="text-xl font-semibold leading-loose text-white">
              Thêm Hàng Hóa
            </h2>
          </div>
          <form className="mt-4 flex" onSubmit={handleForm}>
            <div className="flex flex-col px-4 py-2">
              <p className="text-white">Tên :</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                onChange={(e) => setName(e.target.value)}
                defaultValue={name}
              />

              <p className="text-white">Giá nhập (k) :</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                onChange={(e) => setGianhap(e.target.value)}
                value={gianhap}
              />

              <p className="text-white">Giá bán lẻ (k):</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                onChange={(e) => setGiabanle(e.target.value)}
                value={giabanle}
              />

              <p className="text-white">Giá bán sỉ (k) :</p>
              <input
                className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
                type="number"
                onChange={(e) => setGiabansi(e.target.value)}
                value={giabansi}
              />
            </div>
            <div className="flex flex-col px-4 py-2">
              <p className="text-white">Đơn vị tính :</p>
              <Select
                options={optionsDVT}
                value={oldDVT}
                onChange={(e) => setIdDVT(e.value)}
                className="my-4 outline-none w-64 rounded-lg"
              />

              <p className="text-white">Nhà cung cấp :</p>
              <Select
                options={optionsNCC}
                onChange={(e) => setIdNCC(e.value)}
                defaultValue={oldNCC}
                className="my-4 outline-none w-64 rounded-lg"
              />

              <p className="text-white">Danh mục :</p>
              <Select
                options={optionsDM}
                defaultValue={oldDM}
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
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
