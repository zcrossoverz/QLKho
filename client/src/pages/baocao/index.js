import React, { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/sidebar";
import HeaderDashboard from "../../components/header";
import Select from "react-select";
import * as khohangService from "../../services/khohangServices";
import currentcyFormat from "../../utils/currentcy";
import ChartDoanhso from "./chart";
import sub5date from "../../utils/sub5Date";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export default function Baocao() {
  const [tonkho, setTonkho] = useState([]);
  const [filter, setFilter] = useState(0);
  const [listDM, setListDM] = useState([]);
  const [listNCC, setListNCC] = useState([]);
  const [sumTonkho, setsumTonkho] = useState(0);
  const [sumAmount, setsumAmount] = useState(0);
  const [ds, setDs] = useState([]);
  const [chartFilter, setChartFilter] = useState(0);
  const [timeFilter, setTimeFilter] = useState([sub5date(new Date()), new Date()]);
  const [arrayDay, setArrayDay] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const fetchKho = async () => {
    const res = await khohangService.listSPKho();
    setTonkho(res);
  };

  const fetchChart = async () => {
    if(chartFilter === 0){
      const res = await khohangService.getDoanhsoAll(timeFilter, 1);
      let rs = res.map(e => e*1000);
      let data = [
        {
          data: [...rs],
          label: "Doanh số (VND)",
          borderColor: "#3e95cd",
          fill: false
        }
      ];
      setDataChart(data);
      console.log(rs);
    }else{
      const res = await khohangService.getDoanhsoAll(timeFilter, 2);
      let rs = res.map(e => e*1000);
      let data = [
        {
          data: [...rs],
          label: "Doanh số (VND)",
          borderColor: "#3e95cd",
          fill: false
        }
      ];
      setDataChart(data);
      console.log(rs);
    }
  }

  const changeDay = () => {
    if(chartFilter === 0) {
      let current = new Date(timeFilter[0]);
      let arr = [];
      let n = Math.floor((Date.UTC(timeFilter[1].getFullYear(), timeFilter[1].getMonth(), timeFilter[1].getDate()) - Date.UTC(timeFilter[0].getFullYear(), timeFilter[0].getMonth(), timeFilter[0].getDate()) ) /(1000 * 60 * 60 * 24));
      for(let i=0;i<=n;i++){
        arr.push(current.getDate()+'/'+(current.getMonth()+1)+'/'+current.getFullYear());
        current.setDate(current.getDate()+1);
      }
      setArrayDay(arr);
    }else{
      let current = new Date(timeFilter[0]);
      let arr = [];
      let n;
      n = (timeFilter[1].getFullYear() - timeFilter[0].getFullYear()) * 12;
      n += timeFilter[1].getMonth() - timeFilter[0].getMonth();
      for(let i=0;i<=n;i++){
        arr.push((current.getMonth()+1)+'/'+current.getFullYear());
        current.setMonth(current.getMonth()+1);
      }
      setArrayDay(arr);
    }
    fetchChart();
  }

  const fetchDS = async () => {
    const res = await khohangService.bcdoanhso();
    // console.log(res);
    setDs(res);
  };

  const fetchDM = async () => {
    const res = await khohangService.listByDM();
    setListDM(res);
    // console.log(1,res);
  };

  const fetchNCC = async () => {
    const res = await khohangService.listByNCC();
    setListNCC(res);
    // console.log(1,res);
  };

  useEffect(() => {
    fetchKho();
    fetchDM();
    fetchNCC();
    fetchDS();
    fetchChart();
  }, []);

  useEffect(() => {
    changeDay();
  }, [timeFilter, chartFilter]);

  useEffect(() => {
    if (filter === 0) {
      let ton = 0;
      let amount = 0;
      tonkho.forEach((e) => {
        ton += parseInt(e.tonkho);
        amount += parseInt(e.daban);
      });
      setsumTonkho(ton);
      setsumAmount(amount);
    }

    if (filter === 1) {
      let ton = 0;
      let amount = 0;
      listNCC.forEach((e) => {
        ton += parseInt(e.sl_tonkho);
        amount += parseInt(e.daban);
      });
      setsumTonkho(ton);
      setsumAmount(amount);
    }

    if (filter === 2) {
      let ton = 0;
      let amount = 0;
      listDM.forEach((e) => {
        ton += parseInt(e.sl_tonkho);
        amount += parseInt(e.daban);
      });
      setsumTonkho(ton);
      setsumAmount(amount);
    }
  }, [filter]);
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
          {/* <tr className="text-white leading-loose font-semibold">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Tổng: </td>
            <td>{sumTonkho}</td>
            <td>{currentcyFormat(sumAmount)}</td>
          </tr> */}
        </tbody>
      </table>
    );
  };

  let FilterDM = () => {
    return (
      <table className="w-full">
        <thead>
          <tr className="text-gray-200 leading-loose font-semibold">
            <td className="border-b border-gray-700">STT</td>
            <td className="border-b border-gray-700">Tên danh mục</td>
            <td className="border-b border-gray-700">Số sản phẩm đang bán</td>
            <td className="border-b border-gray-700">Tồn kho</td>
            <td className="border-b border-gray-700">Đã bán</td>
          </tr>
        </thead>
        <tbody>
          {listDM.map((e, i) => {
            return (
              <tr className="text-white leading-loose">
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.sl_sp}</td>
                <td>{e.sl_tonkho}</td>
                <td>{e.daban}</td>
              </tr>
            );
          })}
          <tr className="text-white leading-loose font-semibold">
            <td></td>
            <td></td>
            <td>Tổng: </td>
            <td>{sumTonkho}</td>
            <td>{sumAmount}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  let FilterNCC = () => {
    return (
      <table className="w-full">
        <thead>
          <tr className="text-gray-200 leading-loose font-semibold">
            <td className="border-b border-gray-700">STT</td>
            <td className="border-b border-gray-700">Tên nhà cung cấp</td>
            <td className="border-b border-gray-700">Số sản phẩm đang bán</td>
            <td className="border-b border-gray-700">Tồn kho</td>
            <td className="border-b border-gray-700">Đã bán</td>
          </tr>
        </thead>
        <tbody>
          {listNCC.map((e, i) => {
            return (
              <tr className="text-white leading-loose">
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.sl_sp}</td>
                <td>{e.sl_tonkho}</td>
                <td>{e.daban}</td>
              </tr>
            );
          })}
          <tr className="text-white leading-loose font-semibold">
            <td></td>
            <td></td>
            <td>Tổng: </td>
            <td>{sumTonkho}</td>
            <td>{sumAmount}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const Report = () => {
    if (filter === 0) {
      return <Tonkho />;
    } else if (filter === 2) {
      return <FilterDM />;
    } else if (filter === 1) {
      return <FilterNCC />;
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
                  label: "Theo nhà cung cấp",
                },
                {
                  value: 2,
                  label: "Theo danh mục",
                },
              ]}
              onChange={(e) => setFilter(e.value)}
            />
          </div>
          <hr className="bg-gray-300 mt-4 mb-6" />
          <Report />
        </div>

        <div className="flex gap-6">
          <div className="p-6 bg-gray-900 rounded-lg w-1/2">
            <div className="flex w-full">
              <h2 className="text-white leading-loose font-semibold text-xl">
                Báo Cáo Doanh Số
              </h2>
            </div>
            <hr className="bg-gray-300 mt-4 mb-6" />
            <table className="w-full">
              <thead>
                <tr className="text-gray-200 leading-loose font-semibold">
                  <td className="border-b border-gray-700">STT</td>
                  <td className="border-b border-gray-700">ID hàng hóa</td>
                  <td className="border-b border-gray-700">Tên hàng hóa</td>
                  <td className="border-b border-gray-700">Tồn kho</td>
                  <td className="border-b border-gray-700">Tổng tiền vốn</td>
                  <td className="border-b border-gray-700">Doanh số</td>
                </tr>
              </thead>
              <tbody>
                {ds.map((e, i) => {
                  return (
                    <tr className="text-white" key={e.id}>
                      <td>{i + 1}</td>
                      <td>{e.idHH}</td>
                      <td>{e.name}</td>
                      <td>{e.tonkho}</td>
                      <td>{currentcyFormat(e.tienvon)}</td>
                      <td>{currentcyFormat(e.tienban)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg w-1/2">
            <div className="mb-4 gap-2 flex">
              <div className="w-44">
                <Select
                  className="w-44"
                  options={[
                    {
                      value: 0,
                      label: "Theo ngày",
                    },
                    {
                      value: 1,
                      label: "Theo tháng",
                    },
                  ]}

                  onChange={(e) => setChartFilter(e.value)}
                />
              </div>
              <div className="flex gap-2 ml-4">
                <DateRangePicker 
                className="bg-white rounded-lg outline-none p-1"
                onChange={setTimeFilter} value={timeFilter} />
              </div>
            </div>
            <ChartDoanhso arrayDay={arrayDay} data={dataChart} />
          </div>
        </div>
      </div>
    </div>
  );
}
