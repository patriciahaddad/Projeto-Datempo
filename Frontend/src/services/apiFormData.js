import Axios from 'axios';

const apiFormData = Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Authorization" : "Bearer " + localStorage.getItem("usuario-datempo")
    }
});

export default apiFormData;