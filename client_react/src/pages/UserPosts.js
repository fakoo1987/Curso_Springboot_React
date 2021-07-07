//Funcion para los posts del usuario
import { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Post from '../components/post/Post';
import Placeholder from "../components/utils/Placeholder";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserPosts } from "../actions/postActions";
import NoPost from "../components/utils/NoPost";

export default function UserPosts() {

    //Se comenta esta linea porque los post se vaan a traer del state globalabajo de const fetched
    //const [posts, setPosts] = useState([]) //Arreglo de post que va,os a estra trayendo de nuestra api
    const [fetching, setFetching] = useState(true); //para saber cuando estamos trayendonos datos de la api 
    const fetched = useSelector(state => state.posts.fetched); //selecionar desde el state global state.posts.fetched
    const posts = useSelector(state => state.posts.posts); 
    const dispatch = useDispatch();

    //se comenta posque ya no se va a utilizar capitulo 12 video 18
    // //funcion que nos llama los post del api disponibles
    // useEffect(() => {
    //     //por metodo get vamos al endpoitn  cuando se complete recibimos el response
    //     axios.get(USER_POST_ENDPOINT).then(response => {
    //         setPosts(response.data);
    //         setFetching(false);
    //     }).catch(e => {
    //         console.error(e);
    //         setFetching(false);
    //     })
    // }, []); 

    useEffect(() => {
       async function fetchedPost(){ //no se pone async porque el callback no es asincrono
            if (!fetched) {//Si no hemos traido los post de la api vamos a traerlos
                try{
                    setFetching(true);
                    await dispatch(getUserPosts());
                    setFetching(false);
                }
                catch(err){  //recoge el error y manda el emnsage del bacjkend por toast
                    toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_CENTER, autoClose:2000});

                }
            }
       }
       fetchedPost();//Cuando se monte el componente se lla esta funcion

    }, [dispatch, fetched]); //Se deben colocar estos dos por que es posible que vallan a cambiar al ejecutarse el codigo del useEffect

    return (
        
        <div>
            <Jumbotron>
                <h2>Mis posts</h2>
            </Jumbotron>
            {fetching && <Placeholder>No SIRVE TOCA MIRAR PORQUE</Placeholder> }
            {/*Efecto de carga loading post */}
            {!fetching && posts.length === 0 && <NoPost text="No hay post privados disponibles"></NoPost>}
        
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={true}></Post> )} 
                {/*Para recorrer los post disponibles y guardarlos en post se muestran siempre y cuando no esten vencidos*/}
            </div>   
        </div>
        
    );
}