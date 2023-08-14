import axios from 'axios';

const ieumAxios = axios.create({
  baseURL: 'https://www.ieum.kro.kr', // 백엔드 서버 URL
  withCredentials: true, // 쿠키 설정
  // validateStatus: (status) => status < 500, // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
});

export default ieumAxios;
