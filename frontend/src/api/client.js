
import axios from 'axios';

// 안드로이드 에뮬레이터의 로컬 호스트 주소
const baseURL = 'http://10.0.2.2:8080';

const client = axios.create({
    baseURL,
});

export default client;
