import axios from 'axios';

const configuration = {
  baseURL: 'https://dummyjson.com/',
};

const instance = axios.create(configuration);
export default instance;
