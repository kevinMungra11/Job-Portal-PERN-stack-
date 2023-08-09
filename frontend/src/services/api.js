import axios from 'axios';

const BASE_URL = 'http://localhost:1111';

const apiRequest = async (method, path, data, headers = {}, params = {}) => {
    console.log(data)
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${path}`,
            params,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default apiRequest;