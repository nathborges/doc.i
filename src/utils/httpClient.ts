import axios from 'axios';

const httpClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Referrer-Policy': 'no-referrer',
  },
});

export default httpClient;
