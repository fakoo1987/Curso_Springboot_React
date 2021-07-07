//Accion que se va a utilizar para traer los post //Capitulo 12 video 7

import axios from "axios";
import { USER_POST_ENDPOINT } from "../helpers/endpoints";
import { SET_USER_POSTS } from "./types";



export const getUserPosts = () => dispatch =>{     //dispatch cuando recibamos los datos de la api vamos hacerle dispstch
//de los datos a nustro reducers para que cambie el state

    return new Promise ((resolve, reject) => {

        axios.get(USER_POST_ENDPOINT)    //axios para enviar una peticion get
            .then(response => {   //Aqui recibimos la respuesta response del backend
                dispatch({//Cuando se complete la peticion 
                    type: SET_USER_POSTS,
                    payload: {fetched: true, posts: response.data}
                });
                resolve(response) //resolvemos la promesa pasando el response

            })
            .catch(err => {
                reject(err);
            })
    });
}