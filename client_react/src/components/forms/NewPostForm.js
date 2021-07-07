import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { exposures } from '../../helpers/exposures';

export default function NewPostForm({errors, onSubmitCallback, pTitle="", pContent="", pExpirationTime=60, pExposureId=exposures.PUBLIC, textButton="Crear post"}) {
    //Ests propiedade venen del componente pafre SignIn.js
    //onSubmitCallback al hacer click se envi la informacion al padre
    const [title, setTitle] = useState(pTitle);
    const [content, setContent] = useState(pContent);
    const [expirationTime, setExpirationTime] = useState(pExpirationTime);
    const [exposureId, setExposureId] = useState(pExposureId);
    //Los campos vacios ("") capitulo 12 video 13

    //Esta funcion envia los datos al padre para que los reciba el callback
    const submitForm = (e ) => {    
        e.preventDefault(); //prevenir el comportamiento por defecto 
        onSubmitCallback({title, content, expirationTime, exposureId});//envia estos dos valores al padre Signin.js
    }
    //La funcion que al darle click envia el formulario
    return (
        <Form onSubmit={submitForm}>
            <Form.Group control="title">{/*Cuando le demos click al label nos seleccione el input*/}
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    //Est valor  esta pegado con nuestro email state
                    onChange={e => setTitle(e.target.value)} //Cuando cambie el valos hay que setear
                    placeholder="e.g  snipet para recorrer un array"//valor dentro de la caja cuando no hay nada
                    isInvalid={errors.title}//Cuando en el objeto de los errores del padre se muestra invalido
                    >                 
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                        {errors.email} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                    </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col md="6" xs="12">
                    <Form.Group controlId="expirationTime"> {/*se controla por la constante expirationTime del useState*/}
                        <Form.Label>Tiempo de expiracion</Form.Label>
                        <Form.Control 
                            disabled={ parseInt(exposureId) === exposures.PRIVATE} //Desabilita el tiempo de expiracion en un post privado
                            as="select" value={expirationTime} //Tipo de componente cuadro de seleccion
                            onChange={e => setExpirationTime(e.target.value)} //Cuando se cambie la opcion en el componente cambia el valor en la variable
                        >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hora</option> {/*Este valos esta por defecto en el componente*/}
                            <option value="120">2 horas</option>
                            <option value="360">6 horas</option>
                            <option value="720">12 horas</option>
                            <option value="1440">1 dia</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.expirationTime} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md="6" xs="12">
                    <Form.Group controlId="expusureId"> {/*se controla por la constante expirationTime del useState*/}
                        <Form.Label>Tipo de post</Form.Label>
                            <div>
                                <Form.Check 
                                    onChange={e => setExposureId(e.target.value)}
                                    checked={ parseInt(exposureId) === exposures.PRIVATE} /*Aqui es donde setea la variable par decirle que el post es privado */
                                    value={exposures.PRIVATE}
                                    inline
                                    label="Privado"
                                    name="exposureId"
                                    type="radio"
                                >
                                </Form.Check>

                                <Form.Check 
                                    onChange={e => setExposureId(e.target.value)} //Evento que cambia el valor con setExposureId
                                    checked={ parseInt(exposureId) === exposures.PUBLIC} /*Aqui es donde setea la variable par decirle que el post es privado */
                                    value={exposures.PUBLIC}
                                    inline
                                    label="Publico"
                                    name="exposureId"
                                    type="radio"
                                >
                                </Form.Check>
                            </div>
                        <Form.Control.Feedback type="invalid">
                            {errors.expirationTime} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group control="content">{/*Cuando le demos click al label nos seleccione el input*/}
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                    as="textarea" //Define el componente como area de texto
                    rows={10} // el area de texto tiene 10 filas                                     
                    value={content} //el valor a modificar
                    //Est valor  esta pegado con nuestro email state
                    onChange={e => setContent(e.target.value)} //Cuando cambie el valor hay que setear
                    isInvalid={errors.content}//Cuando en el objeto de los errores del padre se muestra invalido
                    >                 
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                        {errors.content} {/*Esto se va a mostrar cuando hay un mensaje de error en la validacion del email*/}
                    </Form.Control.Feedback>
            </Form.Group>


            <Button variant="primary" type="submit">{textButton}</Button>
        </Form>
    );
}