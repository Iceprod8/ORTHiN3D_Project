import axios from 'axios';

export const axiosRequest = async ({ method, url, setStateFunction = null, data = null, headers = null, suppressErrorLog = false, liked = null }) => {
    try {
        const config = { method, url, headers, data };
        const response = await axios(config);
        if (liked !== null) {
            const transformedData = response.data.reduce((acc, el) => { acc[el._id] = true; return acc; }, {});
            if (setStateFunction !== null) setStateFunction(transformedData);
            return transformedData;
        } else {
            if (setStateFunction !== null) setStateFunction(response.data);
            return response.data;
        }
    } catch (error) {
        if (!suppressErrorLog) console.error(`Error in Axios request to ${url}`, error.response || error);
        return null;
    }
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};