import Axios from 'axios';

const api = Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("usuario-datempo")
    }
});

export default api;