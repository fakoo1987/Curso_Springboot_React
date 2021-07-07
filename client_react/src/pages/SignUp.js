import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import { loginUser, registerUser } from "../actions/authActions";
import SignUpForm from "../components/forms/SignUpForm";
import { isObjEmpty } from "../helpers/helpers";

export default function SignUp() {

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
    const register = ({email, password, firstName, lastName}) =>{
        const errors = {}; //limpia los errores anteriores
        setErrors(errors); //para calcular despues si tenemos otro error

        if(!validator.isEmail(email)){
            errors.email = "El correo electronico es invalido";
        }
        if(!validator.isLength(password, {min: 8, max: 30})){//valida strings vacios no objetos
            errors.password = "La contraseña debe tener entre 8 y 30 caracteres";
        }
        if(validator.isEmpty(firstName)){
            errors.firstName = "El nombre es obligatorio";
        }
        if(validator.isEmpty(lastName)){
            errors.lastName = "El apellido es obligatorio";
        }

        //Si el objeto de los errores tiene algo hay errores isObjEmpty importado desde helpers
        if (!isObjEmpty(errors)) {
            setErrors(errors); //retorna los errores al state errors 
            return;            
        }

        //llamar nuestra funcion login que vamos a crear en authActions para enviar al backend la data y que nos devuelva el response
        dispatch(registerUser({ email, password, firstName, lastName}))
        .then(response => { //si tenomos response
            //Cuando la respuesta sea valida vamos a loguear el usuario automaticamente cuando se registre
            dispatch(loginUser({ email, password}));
            //cuando se realice la accion loginUser de iniciar sesion 
        }).catch(err => { //Atrapamos el error
            //Se puede enviar un mensaje desde el backend se crea una excepcion personalizada  y se atrapa de la siguiente manera
            //err.response.data.message
            setErrors({ registerError : err.response.data.message});
            //Si entra aqui el backend nos devuelve un error como el correo ya esta en uso
        });
    }
 
    return (
        <Container className="mt-5">{/*Margin top*/}
            <Row>
                <Col sm="12" md={{span: 8, offser:2}} lg={{span: 6, offser:3}}>
                    <Card body>
                        { errors.registerError && <Alert variant="danger">{ errors.registerError }</Alert>}  

                        <h3>Crear Cuenta</h3><hr></hr>
                        <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>
                        <div className="mt-4">
                            <Link to={"/signin"}>
                                Ya tienes una cuenta? Inicia sesion aqui.
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}