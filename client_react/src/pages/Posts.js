//Pagina principal del proyecto
import axios from "axios";
import { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { PUBLIC_POST_ENDPOINT } from "../helpers/endpoints";
import Post from '../components/post/Post';
import Placeholder from "../components/utils/Placeholder";
import NoPost from "../components/utils/NoPost";

export default function Posts() {

    const [posts, setPosts] = useState([]); //Arreglo de post que va,os a estra trayendo de nuestra api
    const [fetching, setFetching] = useState(true); //para saber cuando estamos trayendonos datos de la api 
    
    //funcion que nos llama los post del api disponibles
    useEffect(() => {
        //por metodo get vamos al endpoitn  cuando se complete recibimos el response
        axios.get(PUBLIC_POST_ENDPOINT).then(response => {
            setPosts(response.data);
            setFetching(false);
        }).catch(e => {
            console.error(e);
            setFetching(false);
        })
    }, []); 

    return (
        
        <div>
            <Jumbotron>
                <h2>Ultimos posts publicos</h2>
            </Jumbotron>
            {fetching && <Placeholder>No SIRVE TOCA MIRAR PORQUE</Placeholder> }
            {!fetching && posts.length === 0 && <NoPost text="No hay post publicos disponibles"></NoPost>}
            
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post> )} 
                {/*Para recorrer los post disponibles y guardarlos en post se muestran siempre y cuando no esten vencidos*/}
            </div>   
        </div>
        
    );
}