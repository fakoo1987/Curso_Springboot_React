import axios from "axios";


const setAuthToken = token => {
    if (token) { //Si el token existe se los vamos aponder a los headers de axios
        axios.defaults.headers.common["Authorization"] = token;
        //se setea el header de Authorization    
    } else{ //si no llega nada se borra el header
        delete axios.defaults.headers.common["Authorization"];
    }
}
export default setAuthToken;