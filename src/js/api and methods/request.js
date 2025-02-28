import axios from "axios";  
import { API_BASE_URL } from "./api";
export async function getAll(endpoints) {
    const result = {
        data: null,
        loading: false,
        error: null,
    }
    await axios.get(API_BASE_URL + endpoints)
        .then((response) => {
            result.data = response.data
        })
        .catch((err) => result.error = err)
        .finally(() => result.loading = false)
    return result
}

export async function getById(endpoints, id) {
    const result = {
        data: null,
        loading: false,
        error: null,
    }
    
    await axios.get(API_BASE_URL + endpoints + `/${id}`)
        .then((response) => {
            result.data = response.data
        })
        .catch((err) => result.error = err)
        .finally(() => result.loading = false)
    return result
}

// post new data
export async function post(endpoints, payload) {
    const result = {
        data: null,
        loading: false,
        error: null,
    }

    await axios.post(API_BASE_URL + endpoints, payload)
        .then((response) => {
            result.data = response.data
        })
        .catch((err) => result.error = err)
        .finally(() => result.loading = false)
    return result
}

// update data by id
export async function update(endpoints, payload, id) {
    const result = { loading: true, data: null, error: null };
    try {
        const response = await fetch(API_BASE_URL + endpoints + `/${id}`, {
            
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        result.data = data;
    } catch (err) {
        result.error = err;
    } finally {
        result.loading = false;
    }

    return result;
}


// delete data by id
export async function deleteOne(endpoints, id) {
    const result = {
        data: null,
        loading: false,
        error: null,
    }

    await axios.delete(API_BASE_URL + endpoints + `/${id}`)
        .then((response) => {
            result.data = response.data
        })
        .catch((err) => result.error = err)
        .finally(() => result.loading = false)
    return result
}

const controller = {
    getAll: getAll,
    getById: getById,
    post: post,
    update: update,
    deleteOne: deleteOne
}

export default controller