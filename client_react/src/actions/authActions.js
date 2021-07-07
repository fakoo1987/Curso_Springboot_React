/* Acciones de autenticacion para nuestro inicio de sesion */

import axios from "axios";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../helpers/endpoints";
import setAuthToken from "../helpers/setAuthToken";
import { SET_CURRENT_USER } from "./types";
import jwt_decode from 'jwt-decode';

//funcion que lleva al backend los datos del usuario con dispatch podemos llamr otra funcion
export const loginUser = (userData) => dispatch => {

    console.log(userData); //imprime los datos correo y password en la consola inspeccionar

    //cuando resolvemos la promesa resolve y cuando hay error reject
    return new Promise((resolve, reject) => {
        //primero va nuestro endpoint, lusego los datos que resivimos del formulario y por ultimo los heders
        axios.post(LOGIN_ENDPOINT, userData, { //NOTA si una variable la pone como comentario no le va a funcionar LOGIN_ENDPOINT
            headers: {"Accept": "application/json", "Content-type": "application/json" }
        }).then(response =>{ //cuando la promesa se resuelve vamos a retornar la respuesta de nuestro servidor

            //console.log(response);

            //Cpnstante donde se va a guardar el header de authorization
            const { authorization } = response.headers; 
            //vaos aguardar el token  en localstorage, en jwtToken vamos a guardar lo de autorization porqyue es nustro bearer token
            localStorage.setItem("jwtToken", authorization);

            //crear funcion para añadir token a axios para que en cada peticion se envie el token automaticamente y no ponerlo en los headers
            setAuthToken(authorization);//se le pasa el token en este caso authorization
            //decodificar el token 
            const decoded = jwt_decode(authorization);

            //Funcion para setear el usuario actual
            dispatch(setCurrentUser({ user: decoded, loggedIn: true }));


            resolve(response);
        }).catch(error => { //Si hay un error lo atrapamos aca
            reject(error);
        }) 
    });
}



export const registerUser = (userData) => dispatch => {

    console.log(userData); //imprime los datos correo y password en la consola inspeccionar

    //cuando resolvemos la promesa resolve y cuando hay error reject
    return new Promise((resolve, reject) => {
        //primero va nuestro endpoint, lusego los datos que resivimos del formulario y por ultimo los heders
        axios.post(REGISTER_ENDPOINT, userData, { //NOTA si una variable la pone como comentario no le va a funcionar LOGIN_ENDPOINT
            headers: {"Accept": "application/json", "Content-type": "application/json" }
        }).then(response =>{ //cuando la promesa se resuelve vamos a retornar la respuesta de nuestro servidor
            //retornamos la promesa con nuestro reponse
            //console.log(response);

            resolve(response);
        }).catch(error => { //Si hay un error lo atrapamos aca
            reject(error);
        }) 
    });
}


//aqui vamos a estar recibiendo los datos que vamos a estar enviandole el usuario y loggin
export const setCurrentUser = ({ user, loggedIn}) => {
    return {//vamos a retornar el tipo de accion que se llama en el authReducer 
        type: SET_CURRENT_USER, //al llamrlo va setear el loggIn y el usuario
        payload: { user, loggedIn} //se necesita el tipo y paiload para setear el reducer
    };
}

//esta funcion nos sirve para remover el usuario del localstorage y del store y quitar el header de asios
export const logoutUser = () => dispatch =>{ //yambien nos ayuda a cerrar la sesion del usuario

    localStorage.removeItem("jwtToken"); //remover la llave jwtToken
    setAuthToken(false); //pra remover el token
    dispatch(setCurrentUser({ //llamar esta accion
        user: {}, //user vacio
        loggedIn: false
    }));    
}