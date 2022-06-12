import * as request from "../utils/request";


export const create = async (name) => {
    try {
        const res = await request.post('/unit/add', {name});
        return res;
    } catch (error) {
        throw error;
    }
};

export const list = async () => {
    try {
        const res = await request.get('/unit');
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteUnit = async (id) => {
    try {
        const res = await request._delete(`/unit/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const res = await request.get(`/unit/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const edit = async (id, name) => {
    try {
        const res = await request.put(`/unit/${id}`, {name});
        return res;
    } catch (error) {
        throw error;
    }
};