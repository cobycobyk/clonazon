import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-clone-cc6c4.cloudfunctions.net/api' // the api url
  //'http://localhost:5001/clone-cc6c4/us-central1/api'
});

export default instance;
