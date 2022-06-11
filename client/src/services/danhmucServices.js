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
}