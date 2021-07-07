/* Definimos la configuracion de nuestro store y redux*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; //upara usar nuestros devtools en firefox o chrome 
//para ver el state y ver como cambia en la aplicacion
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //No es necesario especificar index javaScript busca por defescto el index


const middleware = [thunk];//middleware que le aplica a los redux

const store = createStore(

    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))//mirar los midleware con la extension de l navegador
);

export default store;