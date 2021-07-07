import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import validator from "validator";
import NewPostForm from "../components/forms/NewPostForm";
import { UPDATE_POST_ENDPOINT, POST_DETAILS_ENDPOINT } from "../helpers/endpoints";
import { exposures } from "../helpers/exposures";
import { isObjEmpty } from "../helpers/helpers";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { getUserPosts } from "../actions/postActions";

export default function EditPost() {

    const {id} = useParams();
    const [errors, setErrors] = useState({});
    //Hook de router-dom que redirecciona las paginas
    const [post, setPost] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch(); //hay que declara esta constate y sino no se reonoce el dispatch

    useEffect(() => {
        //por metodo get vamos al endpoitn  cuando se complete recibimos el response
                axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {  //Consigue el post en la response 
                    setPost(response.data);            
                }).catch(e => {
                    history.push('/'); // si el post es privado o expiro se redirige al usuario al inicio
                })
    }, [id, history]); //Se deben colocar estos dos por que es posible que vallan a cambiar al ejecutarse el codigo del useEffect

    //Funcion que recibe del hijo para el callback
    const editPost = async({title, content, expirationTime, exposureId}) =>{
        const errors = {}; //limpia los errores anteriores
        setErrors(errors); //para calcular despues si tenemos otro error

        if(validator.isEmpty(title)){  //si el titulo esta vacio
            errors.title = "El titulo es obligatorio";
        }
        if(validator.isEmpty(content)){ //si el content esta vacio
            errors.content = "El contenido es obligatorio";
        }

        //Si el objeto de los errores tiene algo hay errores isObjEmpty importado desde helpers
        if (!isObjEmpty(errors)) {
            setErrors(errors); //retorna los errores al state errors 
            return;            
        }

        expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime; //Si el post es privado la expiracion se establece en 0
        console.log({title, content, expirationTime, exposureId});


        //este codigo cambia para refaccionarlo en el capitulo 12 video 19
        // axios.post(CREATE_POST_ENDPOINT, {title, content, expirationTime, exposureId})
        //     .then(response => {
        //         console.log(response);
        //         toast.info("El post se ha creado", {
        //             position: toast.POSITION.BOTTOM_CENTER, //Posicion del mensaje
        //             autoClose: 2000 //Tiempo de duracion del mensaje
        //         });
        //         history.push(`/post/${response.data.postId}`)
        //     })
        //     .catch(error =>{
        //         setErrors({
        //             newpost: error.response.data.message  //error desde nuestro backend
        //         });
        //     })
        try {
            const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`, {title, content, expirationTime, exposureId});
            //response guardando en esta constante y le damos await a la peticion de nuestro backend
            //esta peticion es para crear el post
            //vamos a usar la accion en postActions para traer los post del usuario
            await dispatch(getUserPosts());
            //despues de fechear los post traemos un toast
            toast.info("El post se ha modificado", {
                position: toast.POSITION.BOTTOM_CENTER, //Posicion del mensaje
                autoClose: 2000 //Tiempo de duracion del mensaje
            });
            history.push(`/post/${response.data.postId}`); //redireccionar al usuario a la vista de ese post
        } catch (err) {
            setErrors({editpost: err.response.data.message});  //error desde nuestro backend           
        }

 
    }
 
    return (
        <Container className="mt-5 mb-5" >{/*Margin top*/}
            <Row>
                <Col sm="12" lg={{span: 10, offser:1}}>
                    <Card body>
                        { errors.editpost && <Alert variant="danger">{ errors.editpost }</Alert>}  

                        <h3>Editar post</h3><hr></hr>
                        {post && <NewPostForm //Si el post existe vamos a renderizar el componente
                            errors={errors} 
                            onSubmitCallback={editPost}
                            pTitle={post.title}
                            pContent={post.content} 
                            pExposureId={post.exposureId}
                            textButton="Editar post"
                        >
                        </NewPostForm>}

                    </Card>
                </Col>
            </Row>
        </Container>
    );
}