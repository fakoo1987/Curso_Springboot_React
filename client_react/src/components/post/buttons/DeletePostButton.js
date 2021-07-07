import axios from "axios";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserPosts } from "../../../actions/postActions";
import { DELETE_POST_ENDPOINT } from "../../../helpers/endpoints";

//Aqui se hace el botton eliminar post
export default function DeletePostButton({postId, title}) {
    
    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: "Eliminar post",
            message: `Estas seguro de eliminar el post ${title}`,
            buttons: [
                {
                    label: "Si",
                    onClick: () => {deletePost()}
                },
                {
                    label: "No",
                    onClick: () => {return false;}
                }
            ]
        });
    }

    const deletePost = async () => {
        try{
            await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`); //Hace una consulta al endpoit para eliminar el post por su Id
            await dispatch(getUserPosts()); //Traemos los post con dispatch de postActions

            toast.info("El post se ha eliminado", {
                position: toast.POSITION.BOTTOM_CENTER, //Posicion del mensaje
                autoClose: 2000 //Tiempo de duracion del mensaje
            });
        }catch(err){
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_CENTER, //Posicion del mensaje
                autoClose: 2000 //Tiempo de duracion del mensaje
            });
        }
    }
    return (

        <Button 
        onClick={ createAlert }
        variant="primary" 
        size="sm"> Eliminar </Button> 
)
}





