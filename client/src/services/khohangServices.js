import * as request from "../utils/request";

export const taoDonHang = async (type, status, note, id2, info) => {
  try {
    const res = await request.post("/warehouse/add", {
      type,
      status,
      note,
      id2,
      info,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const listNhap = async () => {
  try {
    const res = await request.get("/warehouse/donnhap");
    return res;
  } catch (error) {
    throw error;
  }
};

export const listXuat = async () => {
  try {
    const res = await request.get("/warehouse/donxuat");
    return res;
  } catch (error) {
    throw error;
  }
};

export const listFull = async () => {
  try {
    const res = await request.get("/warehouse/");
    return res;
  } catch (error) {
    throw error;
  }
};

export const _delete = async (id) => {
  try {
    const res = await request._delete(`/warehouse/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getTonKho = async () => {
  try {
    const res = await request.get("/warehouse/tonkho");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSPTonKho = async (id) => {
  try {
    const res = await request.get(`/warehouse/kho/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getDonChuaTT = async () => {
  try {
    const res = await request.get("/warehouse/chuatt");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getInfoDon = async (id) => {
  try {
    const res = await request.get(`/warehouse/don/${id}`);
    const data = await request.get(`/warehouse/datadon/${id}`);
    return {
      info: res,
      data,
    };
  } catch (error) {
    throw error;
  }
};

export const thanhtoan = async (id) => {
  try {
    const res = await request.get(`/warehouse/thanhtoan/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const listByDM = async () => {
  try {
    const res = await request.get(`/warehouse/danhmuc`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const listByNCC = async () => {
  try {
    const res = await request.get(`/warehouse/nhacungcap`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const doanhso = async () => {
  try {
    const res = await request.get(`/warehouse/doanhso`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const bcdoanhso = async () => {
  try {
    const res = await request.get(`/warehouse/baocaods`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const listSPKho = async (options = 0) => {
  try {
    let res;
    if (options === 0) res = await request.get(`/warehouse/sptonkho`);
    else res = await request.get(`/warehouse/sptonkho/${options}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getDoanhsoAll = async (time, options = 1) => {
  try {
    let data = [];
    let time_current = new Date(time[0]);

    let n;
    if(options === 1) n = Math.floor(
      (Date.UTC(time[1].getFullYear(), time[1].getMonth(), time[1].getDate()) -
        Date.UTC(
          time[0].getFullYear(),
          time[0].getMonth(),
          time[0].getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    if(options === 2) {
        n = (time[1].getFullYear() - time[0].getFullYear()) * 12;
        n += time[1].getMonth() - time[0].getMonth();
    }

    for (let i = 0; i <= n; i++) {
      console.log(
        `${time_current.getDate()}/${
          time_current.getMonth() + 1
        }/${time_current.getFullYear()}`
      );
      const res = await request.post(`warehouse/dsall`, {
        time: `${options === 1 ? time_current.getDate() : '%'}/${
          time_current.getMonth() + 1
        }/${time_current.getFullYear()}`,
      });
      data.push(res.tien ? parseInt(res.tien) : 0);

      if(options === 1) time_current.setDate(time_current.getDate() + 1);
      else time_current.setMonth(time_current.getMonth() + 1);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
