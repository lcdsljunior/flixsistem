import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
// /movie/11?api_key=f114d1bd5a6a037d03d24678af9a3741'

const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/'
});


export default api;