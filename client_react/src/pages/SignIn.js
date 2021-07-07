import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import { loginUser } from "../actions/authActions";
import SigninForm from "../components/forms/SigninForm";
import { isObjEmpty } from "../helpers/helpers";

export default function Signin() {

    const [errors, setErrors] = useState({});
    //useDispatch para llamar acciones, accion para enviar al backend la peticion para el inicio de sesion
    const dispatch = useDispatch();
    //UseSelector para selecionar datos de nuestro store
    const loggedIn = useSelector(state => state.auth.loggedIn); //state global que trae los saltos auth loggedIn
    //Hook de router-dom que redirecciona las paginas
    const history = useHistory();

    
    //Funcion que se va llamr cuando el componente se monta o inicie en la aplicacion 
    useEffect(() => {
        if (loggedIn) {//si esta en el sistema el usuario lo redireccionaremos a la pagina principal

            history.push("/"); //envia al usuario a la pagina principal para que no vuelva a logIn
        }

    });


    //Funcion que recibe del hijo para el callback
    const login = ({email, password}) =>{
        const errors = {}; //limpia los errores anteriores
        setErrors(errors); //para calcular despues si tenemos otro error

        if(!validator.isEmail(email)){
            errors.email = "El correo electronico es invalido";
        }
        if(validator.isEmpty(password)){//valida strings vacios no objetos
            errors.password = "La contraseña no puede estar vacia";
        }
        //Si el objeto de los errores tiene algo hay errores isObjEmpty importado desde helpers
        if (!isObjEmpty(errors)) {
            setErrors(errors); //retorna los errores al state errors 
            return;            
        }

        //llamar nuestra funcion login que vamos a crear en authActions para enviar al backend la data y que nos devuelva el response
        dispatch(loginUser({ email, password}))
        .then(response => { //si tenomos response

        }).catch(err => { //Atrapamos el error
            //Se puede enviar un mensaje desde el backend se crea una excepcion personalizada  y se atrapa de la siguiente manera
            //err.response.data.message
            setErrors({ auth: "No se puede iniciar sesion con esas credenciales"});
        });
    }
 
    return (
        <Container className="mt-5">{/*Margin top*/}
            <Row>
                <Col sm="12" md={{span: 8, offser:2}} lg={{span: 6, offser:3}}>
                    <Card body>
                        { errors.auth && <Alert variant="danger">{ errors.auth }</Alert>}  

                        <h3>Inciar sesión</h3><hr></hr>
                        <SigninForm errors={errors} onSubmitCallback={login}></SigninForm>
                        <div className="mt-4">
                            <Link to={"/signup"}>
                                No tienes una cuenta? Registrate aqui.
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}