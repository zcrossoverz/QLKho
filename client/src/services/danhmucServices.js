import * as request from "../utils/request";


export const create = async (name) => {
    try {
        const res = await request.post('/category/add', {name});
        return res;
    } catch (error) {
        throw error;
    }
};

export const list = async () => {
    try {
        const res = await request.get('/category');
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const res = await request._delete(`/category/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const res = await request.get(`/category/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const edit = async (id, name) => {
    try {
        const res = await request.put(`/category/${id}`, {name});
        return res;
    } catch (error) {
        throw error;
    }
};