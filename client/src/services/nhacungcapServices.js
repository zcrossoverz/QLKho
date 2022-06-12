import * as request from "../utils/request";


export const create = async (name, sdt, diachi, email, ngayhoptac) => {
    try {
        const res = await request.post('/provider/add', {name,sdt,diachi, email, ngayhoptac});
        return res;
    } catch (error) {
        throw error;
    }
};

export const list = async () => {
    try {
        const res = await request.get('/provider');
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteProvider = async (id) => {
    try {
        const res = await request._delete(`/provider/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const res = await request.get(`/provider/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const edit = async (id, name, sdt, email, diachi, ngayhoptac) => {
    try {
        const res = await request.put(`/provider/${id}`, {name, sdt,email, diachi, ngayhoptac});
        console.log({name, sdt,email, diachi, ngayhoptac});
        return res;
    } catch (error) {
        throw error;
    }
};