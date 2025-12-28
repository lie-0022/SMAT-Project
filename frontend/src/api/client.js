
import axios from 'axios';

// 안드로이드 에뮬레이터의 로컬 호스트 주소
const baseURL = 'http://10.0.2.2:8080';

const client = axios.create({
    baseURL,
});

export const getTimetable = async () => {
    try {
        const response = await client.get('/api/schedule');
        return response.data;
    } catch (error) {
        console.error('Error fetching timetable:', error);
        return [];
    }
};

export const getMenus = async (date) => {
    try {
        const response = await client.get(`/api/campus/menus?date=${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        return [];
    }
};

export default client;
