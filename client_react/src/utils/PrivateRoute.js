//Maneja rutas privadas que estan proegidas pornutneticacion  verifica si hay autenticacion si la hay 
//lo deja pasar si no lo redirige

import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";


export default function PrivateRoute({component: Component, ...rest}) {

    const  loggedIn = useSelector(state => state.auth.loggedIn); //trae login desde el state global
 
    return (
        <Route
        {...rest} 
        render={
            props => loggedIn === true? 
            (<Component {...props}></Component>) //Si si que renderice el componente
            :(<Redirect to="/signin"></Redirect>)} //Si no que redirija
        //Cuando se valla a renderizar el componente vamos a decir si tiene autenticacion o no     
        ></Route>
    );
}