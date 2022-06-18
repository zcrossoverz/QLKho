import React from "react";
import currentcyFormat from "../../utils/currentcy";
import formatDate from "../../utils/formatDay";

export const PrintHoadon = React.forwardRef((props, ref) => {
    let amount = 0;
  return (
    <div ref={ref} className="p-12">
      <p className="text-xl font-semibold leading-loose">
        CTY TNHH 1 Thành Viên ABC
      </p>
      <div className="flex items-center text-center flex-col">
        <h1 className="text-2xl font-bold leading-loose">
          CHI TIẾT PHIẾU {props.type === 1 ?'NHẬP':'XUẤT' } HÀNG
        </h1>
      </div>
      <p className="italic underline underline-offset-2 mb-1">
        Thông tin đơn hàng
      </p>
      <p>Mã đơn: DH{props.id}</p>
      <p>{ props.type === 1 ? 'Nhà cung cấp':'Khách hàng' }: {props.name2}</p>
      <p>Nội dung: {props.note}</p>
      <p>Trạng thái: <span className="font-semibold">Đã thanh toán</span></p>
      <p>Ngày tạo: {formatDate(props.time)}</p>

      <p className="mt-4 italic underline underline-offset-2">
        Chi tiết đơn hàng
      </p>
      <table className="mt-2 w-full border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600">STT</th>
            <th className="border border-slate-600">Tên sản phẩm</th>
            <th className="border border-slate-600">Đơn vị</th>
            <th className="border border-slate-600">Số lượng</th>
            <th className="border border-slate-600">Tổng tiền</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {props.data.map((e, i) => {
            amount += e.total;
            return (
                <tr>
                  <td className="border border-slate-600">{i+1}</td>
                  <td className="border border-slate-600">{e.name}</td>
                  <td className="border border-slate-600">{e.dvt}</td>
                  <td className="border border-slate-600">{e.num}</td>
                  <td className="border border-slate-600">{currentcyFormat(e.total)}</td>
                </tr>
              );
          })}
          <tr>
            <td className="border border-slate-600" colSpan={4}>
              Tổng thành tiền
            </td>
            <td className="border border-slate-600">{currentcyFormat(amount)}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col pt-6 text-right">
        <p className="pr-10 mr-4 font-bold">Người xuất hóa đơn</p>
        <p className="pr-12 mr-4">(Ký ghi rõ họ tên)</p>
      </div>
    </div>
  );
});
