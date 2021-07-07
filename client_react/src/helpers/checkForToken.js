import setAuthToken from "./setAuthToken";
import jwt_decode from 'jwt-decode';
import store from "../store";
import { logoutUser, setCurrentUser } from "../actions/authActions";


//funcion que nos permite chequear si el token esta en el localstorage y mirar si es valido por tiempo
const checkForToken = () =>{

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        //decodifica el token
        const decoded = jwt_decode(localStorage.jwtToken);

        //Aqui se posdria tarer del endpoint de detalles de usuario http://localhost:8080/ users para que el
        //nombre de usuario se mestre y no el correo en la bbara desplegable de cerrar sesion


        //setear el token en el store
        store.dispatch(setCurrentUser({
            user: decoded,
            loggedIn: true
        }))

        //verificar que el token no este expirado
        const currentTime =  Math.floor(Date.now() / 1000); //Se atrapa el tiempo actual en milisegundos
        if (decoded.exp < currentTime) { //Si la expiracion del token es menor que el tiempo actual el token ya ha expirado
            store.dispatch(logoutUser()); //lanza la funcion logout
            window.location.href="/signin"; //se redireciona al usuario a signin
        }
    }

}
export default checkForToken;