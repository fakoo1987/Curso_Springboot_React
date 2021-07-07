import { SET_USER_POSTS } from "../actions/types"; //Capitulo 12 video 7

// Reducer de autenticacion donde se guarda el state de la autenticacion
const initialState = {posts: [], fetched: false}; //State
//fetched para saber si los post ya se han traido de la api o no..
// post: [] coleccion de post

// Crear funcion que se exporta 
export default function userPostReducers(state = initialState, action) {
    /* constante donde se agarra el tipo de accion o payload o datos que se envian en la accion */
    const { type, payload} = action;

    switch(type){
        case SET_USER_POSTS:
            return{
                ...state, // devuelve el state normal
                fetched: payload.fetched,
                posts: payload.posts
            }
        default:
            return state;
    };
}