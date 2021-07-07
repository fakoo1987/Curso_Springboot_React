import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function SignInForm({errors, onSubmitCallback}) {
    //Ests propiedade venen del componente pafre SignIn.js
    //onSubmitCallback al hacer click se envi la informacion al padre
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    //Los campos vacios ("") capitulo 11 video 1

    //Esta funcion envia los datos al padres para que los reciba el callback
    const submitForm = (e ) => {    
        e.preventDefault(); //prevenir el comportamiento por defecto 
        onSubmitCallback({email, password, firstName, lastName});//envia estos dos valores al padre Signin.js
    }
    //La funcion que al darle click envia el formulario
    return (
        <Form onSubmit={submitForm}>

            <Row>
                <Col md="6" xs="12" >
                    <Form.Group control="firstName">{/*Cuando le demos click al label nos seleccione el input*/}
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            //Est valor  esta pegado con nuestro email state
                            onChange={e => setFirstName(e.target.value)} //Cuando cambie el valos hay que setear
                            placeholder="Nombre"//valor dentro de la caja cuando no hay nada
                            isInvalid={errors.firstName}//Cuando en el objeto de los errores del padre se muestra invalido
                            >                 
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                                {errors.firstName} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                            </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md="6" xs="12" >
                    <Form.Group control="lastName">{/*Cuando le demos click al label nos seleccione el input*/}
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                //Est valor  esta pegado con nuestro email state
                                onChange={e => setLastName(e.target.value)} //Cuando cambie el valos hay que setear
                                placeholder="Apellido"//valor dentro de la caja cuando no hay nada
                                isInvalid={errors.lastName}//Cuando en el objeto de los errores del padre se muestra invalido
                                >                 
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                    {errors.lastName} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                                </Form.Control.Feedback>
                        </Form.Group>
                </Col>
            </Row>


            <Form.Group control="email">{/*Cuando le demos click al label nos seleccione el input*/}
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    //Est valor  esta pegado con nuestro email state
                    onChange={e => setEmail(e.target.value)} //Cuando cambie el valos hay que setear
                    placeholder="Correo electronico"//valor dentro de la caja cuando no hay nada
                    isInvalid={errors.email}//Cuando en el objeto de los errores del padre se muestra invalido
                    >                 
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                        {errors.email} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                    </Form.Control.Feedback>
            </Form.Group>

            <Form.Group control="password">{/*Cuando le demos click al label nos seleccione el input*/}
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    //Est valor  esta pegado con nuestro email state
                    //NOTA pilas con Change o sino no escribe no es "Changue"
                    onChange={e => setPassword(e.target.value)} //Cuando cambie el valos hay que setear
                    placeholder="Contraseña"//valor dentro de la caja cuando no hay nada
                    isInvalid={errors.password}//Cuando en el objeto de los errores del padre se muestra invalido
                    >                 
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                        {errors.password} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                    </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Crear Cuenta</Button>
        </Form>
    );
}