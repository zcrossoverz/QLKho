import * as request from "../utils/request";


export const create = async (name, sdt, diachi, email, ngayhoptac) => {
    try {
        const res = await request.post('/customer/add', {name,sdt,diachi, email, ngayhoptac});
        return res;
    } catch (error) {
        throw error;
    }
};

export const list = async () => {
    try {
        const res = await request.get('/customer');
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const res = await request._delete(`/customer/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const res = await request.get(`/customer/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const edit = async (id, name, sdt, email, diachi, ngayhoptac) => {
    try {
        const res = await request.put(`/customer/${id}`, {name, sdt,email, diachi, ngayhoptac});
        console.log({name, sdt,email, diachi, ngayhoptac});
        return res;
    } catch (error) {
        throw error;
    }
};