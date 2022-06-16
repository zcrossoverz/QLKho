import React, { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import Select from "react-select";
import * as khohangService from "../../services/khohangServices";

export default function Baocao() {
  const [tonkho, setTonkho] = useState([]);
  const [filter, setFilter] = useState(0);
  const fetchKho = async () => {
    const res = await khohangService.listSPKho();
    console.log(res);
    setTonkho(res);
  };

  const fetchKho2 = async (type) => {
    const res = await khohangService.listSPKho(type);
    console.log("change");
    setTonkho(res);
  };

  useEffect(() => {
    fetchKho();
  }, []);

  useEffect(() => {
    switch(filter){
        case 0: fetchKho();
        case 4: fetchKho2(1);
        case 5: fetchKho2(2);
    }
  },[filter])
  let Item = (props) => {
    return (
      <tr className="text-white leading-loose">
        <td>{props.stt}</td>
        <td>{props.name}</td>
        <td>{props.dvt}</td>
        <td>{props.danhmuc}</td>
        <td>{props.nhacungcap}</td>
        <td>{props.tonkho}</td>
        <td>{props.daban}</td>
      </tr>
    );
  };

  let Tonkho = () => {
    return (
      <table className="w-full">
        <thead>
          <tr className="text-gray-200 leading-loose font-semibold">
            <td className="border-b border-gray-700">STT</td>
            <td className="border-b border-gray-700">Tên</td>
            <td className="border-b border-gray-700">Đơn vị tính</td>
            <td className="border-b border-gray-700">Danh mục</td>
            <td className="border-b border-gray-700">Nhà cung cấp</td>
            <td className="border-b border-gray-700">Số lượng tồn</td>
            <td className="border-b border-gray-700">Đã bán</td>
          </tr>
        </thead>
        <tbody>
          {tonkho.map((e, i) => {
            return (
              <Item
                stt={i + 1}
                name={e.name}
                dvt={e.dvt}
                nhacungcap={e.name_ncc}
                tonkho={e.tonkho}
                danhmuc={e.name_dm}
                daban={e.daban}
                key={e.id}
              />
            );
          })}
        </tbody>
      </table>
    );
  };

  const Report = () => {
    if (filter === 0 || filter === 4 || filter === 5) {
      return <Tonkho />;
    }
  };
  return (
    <div className="flex w-full min-h-screen bg-gray-800 gap-y-4">
      <Sidebar active={7} />
      <div className="flex flex-col flex-1 gap-6 p-4">
        <HeaderDashboard title="Thống kê" />
        <hr className="border-gray-700" />
        <div className="p-6 bg-gray-900 rounded-lg">
          <div className="flex w-full">
            <h2 className="text-white leading-loose font-semibold text-xl">
              Báo Cáo Kho Hàng
            </h2>
            <Select
              className="ml-4 w-48"
              options={[
                {
                    value: 0,
                    label: "Tất cả",
                  },
                {
                    value: 1,
                    label: "Theo đơn vị tính",
                  },
                {
                  value: 2,
                  label: "Theo nhà cung cấp",
                },
                {
                    value: 3,
                    label: "Theo danh mục",
                },
                {
                    value: 4,
                    label: "Theo số lượng tồn",
                },
                {
                    value: 5,
                    label: "Theo số lượng xuất kho",
                },
              ]}

              onChange={e => setFilter(e.value)}
            />
          </div>
          <hr className="bg-gray-300 mt-4 mb-6" />
          <Report />
        </div>
      </div>
    </div>
  );
}
