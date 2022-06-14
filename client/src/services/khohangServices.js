import * as request from "../utils/request";


export const taoDonHang = async (type, status, note, id2) => {
    try {
        const res = await request.post('/provider/add', {});
        return res;
    } catch (error) {
        throw error;
    }
};

export const listNhap = async () => {
    try {
        const res = await request.get('/warehouse/donnhap');
        return res;
    } catch (error) {
        throw error;
    }
};

export const listXuat = async () => {
    try {
        const res = await request.get('/warehouse/donxuat');
        return res;
    } catch (error) {
        throw error;
    }
};

export const _delete = async(id) => {
    try {
        const res = await request._delete(`/warehouse/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
}

