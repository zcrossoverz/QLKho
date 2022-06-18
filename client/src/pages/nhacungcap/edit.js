import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import formatDate from "../../utils/formatDay";
import { errorToast, succesToast } from "../../utils/toast";
import { validateEmail, validatePhone } from "../../utils/validator";
import * as nhacungcapService from "../../services/nhacungcapServices";
import { useParams } from "react-router-dom";

export default function EditNhacungcap() {
  const [name, setName] = useState("");
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [email, setEmail] = useState("");
  const [ngayhoptac, setNgayhoptac] = useState(new Date());

  let { id } = useParams();

  const validator = () => {
    if (!name || !sdt || !email || !diachi || !ngayhoptac) {
      errorToast("Hãy điền đầy đủ thông tin!");
      return false;
    }

    if (!validateEmail(email)) {
      errorToast("Email không hợp lệ!");
      return false;
    }

    if (!validatePhone(sdt)) {
      errorToast("Số điện thoại không hợp lệ!");
      return false;
    }

    return true;
  };

  const getInfo = async () => {
    const res = await nhacungcapService.getOne(id);
    setName(res.name);
    setDiachi(res.diachi);
    setEmail(res.email);
    setSdt("0"+parseInt(res.sdt));
    setNgayhoptac(new Date(res.ngayhoptac));
  };

  useEffect(() => {
    getInfo();
  }, []);

  const editInfo = async (name, email, diachi, sdt, ngayhoptac) => {
    const res = await nhacungcapService.edit(id, name, parseInt(sdt), email, diachi, formatDate(ngayhoptac));
    if(res.message === 'success'){
        succesToast("Cập nhật thành công!");
    }else if(res.message === 'exists'){
      errorToast("Trùng tên nhà cung cấp cũ");
    }
  };


  const handleForm = (e) => {
    e.preventDefault();
    if (validator()) {
        editInfo(name, email, diachi, sdt, ngayhoptac);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <ToastContainer />
      <Sidebar active={3} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Nhà cung cấp" />
        <hr className="border-gray-700" />
        <div className="p-6 bg-gray-900 rounded-lg w-1/2">
          <div className="flex justify-between items-center pb-4 w-full">
            <h2 className="text-xl font-semibold leading-loose text-white">
              Sửa Thông Tin Nhà Cung Cấp
            </h2>
          </div>
          <form className="mt-4 flex flex-col" onSubmit={handleForm}>
            <p className="text-white">Tên :</p>
            <input
              className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-white">Số điện thoại :</p>
            <input
              className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
              defaultValue={sdt}
              onChange={(e) => setSdt(e.target.value)}
            />

            <p className="text-white">Địa chỉ :</p>
            <input
              className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
              defaultValue={diachi}
              onChange={(e) => setDiachi(e.target.value)}
            />

            <p className="text-white">Email :</p>
            <input
              className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="text-white">Ngày hợp tác :</p>
            <DatePicker
              className="my-4 outline-none w-64 py-3 px-2 rounded-lg text-gray-800 bg-gray-100"
              selected={ngayhoptac}
              onChange={(date) => setNgayhoptac(date)}
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
          </form>
        </div>
      </div>
    </div>
  );
}
