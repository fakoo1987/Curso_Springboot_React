import { SET_CURRENT_USER } from "../actions/types";

// Reducer de autenticacion donde se guarda el state de la autenticacion
const initialState = {loggedIn: false, user:{}};
 
// Crear funcion que se exporta 
export default function authReducer(state = initialState, action) {
    /* constante donde se agarra el tipo de accion o payload o datos que se envian en la accion */
    const { type, payload} = action;

    switch(type){
        case SET_CURRENT_USER:
            return{
                ...state, /* devuelve el state normal */
                loggedIn: payload.loggedIn,
                user: payload.user
            };
        default:
            return state;
    }
}

