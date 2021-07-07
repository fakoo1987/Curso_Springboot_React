// //Vamos a mostrar renderizar los detalles de los post el cual se va enviar en la url el id de ese post
import moment from 'moment';
import axios from "axios";
import React, { useState, useEffect }  from 'react';
import { Button, Card, Jumbotron } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { POST_DETAILS_ENDPOINT } from "../helpers/endpoints";
import { Prism as SystaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { downloadTextAsFile } from '../helpers/helpers';

export default function PostDetails() {

    const {id} = useParams();//En est constante guardamos el id que viene en la url
    //a esta ruta enviar un id
    //de le pone el mismo que en la ruta de App.js
    const [post, setPost] = useState(null);
    const history = useHistory();

    useEffect(() => {
        //por metodo get vamos al endpoitn  cuando se complete recibimos el response
                axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {  //Consigue el post en la response 
                    setPost(response.data);            
                }).catch(e => {
                    history.push('/'); // si el post es privado o expiro se redirige al usuario al inicio
                })
    }, [id, history]);//Se deben colocar estos dos por que es posible que vallan a cambiar al ejecutarse el codigo del useEffect
 
    return (
        <div className="pb-4">
        { post && ( //Si post existe  si ya lo trajo de la api entonces lo vamos arenderizar problema con title null
            <React.Fragment>
                <Jumbotron>
                    <h1>{ post.title } </h1>
                    <p>Creado por { post.user.firstName }, { moment(post.createdAt).fromNow() }</p>
                </Jumbotron>

                <Card>                 
                    <Card.Header>
                        <Button 
                            variant= "primary" 
                            className="mr-10 " 
                            size="sm" 
                            onClick={() => {
                                downloadTextAsFile(post.postId, post.content) //Funcion de helpers para descargar archivo 
                            }}>Descargar</Button>
                        <CopyToClipboard
                            onCopy={() => {
                                toast.info("Copiado al portapapeles", {
                                    position: toast.POSITION.BOTTOM_CENTER, //Posicion del mensaje
                                    autoClose: 2000 //Tiempo de duracion del mensaje
                                });
                            }}
                            text={post.content}//Copia el contenido del post
                        >
                            <Button 
                                variant= "primary" 
                                size="sm" 
                                onClick={() => {

                                }}>Copiar al portapapeles</Button>
                        </CopyToClipboard>
                    </Card.Header>
                        <Card.Body>
                            <SystaxHighlighter showLineNumbers={true}>{post.content}</SystaxHighlighter>
                            {/*Para resaltar el texto del contenido y numerar las lineas del texto */}
                        </Card.Body>
                </Card>
            </React.Fragment>
        ) }
    </div>
    );
}