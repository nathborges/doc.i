import axios from 'axios';

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Referrer-Policy': 'no-referrer',
  },
  mode: 'cors',
});

export default httpClient;
