import * as request from "../utils/request";


export const create = async (name, gianhap, giabanle, giabansi, idNCC, idDVT, idDM) => {
    try {
        const res = await request.post('/object/add', {name, gianhap, giabanle, giabansi, idNCC, idDVT, idDM});
        return res;
    } catch (error) {
        throw error;
    }
};

export const list = async () => {
    try {
        const res = await request.get('/object');
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteObject = async (id) => {
    try {
        const res = await request._delete(`/object/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const res = await request.get(`/object/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const edit = async (id, name, gianhap, giabanle, giabansi, idNCC, idDVT, idDM) => {
    try {
        const res = await request.put(`/object/${id}`, {name, gianhap, giabanle, giabansi, idNCC, idDVT, idDM});
        // console.log({name, sdt,email, diachi, ngayhoptac});
        return res;
    } catch (error) {
        throw error;
    }
};