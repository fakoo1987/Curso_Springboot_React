/* Nuestro archivo principal reducers donde se van a traer todos los reducers de la carpeta */
//import { combineReducers } from "redux";
/* para combinar varios reucers */
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userPostReducers from "./userPostReducers";



export default combineReducers ({
    /* se exportan todos los reducers y se guardan en un objeto */
    auth: authReducer,
    posts: userPostReducers
});
