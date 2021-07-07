import moment from "moment";
import { Badge, Button, Card } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { exposures } from "../../helpers/exposures";
import DeletePostButton from './buttons/DeletePostButton';

export default function Post({post, renderControls}) {
 
    return (
        <Card className="mb-4">
            {renderControls &&
            <Card.Header className="d-flex justify-content-between"> {/*Vamos atener los controles  de cada uno de los posts*/}
                <div> {/*miramos si es un post publico o privdo */}
                
                    <Badge variant="primary" className="mr-7"> { post.exposure.type } </Badge>
                    { post.expired && post.exposure.id === exposures.PUBLIC && <Badge variant="danger" className="mr-2"> Expiro </Badge>} {/*Pregunt por expired el nooleano de PostRest.java backend */}
                </div>  
                <div>
                    <Button variant="primary" size="sm" className="mr-2"
                    as={NavLink} to={`editpost/${post.postId}`}
                    > Editar </Button>
                    <DeletePostButton postId={post.postId} title={post.title} ></DeletePostButton>

                    {/*<Button variant="primary" size="sm"> Eliminar </Button>*/}  
                </div>   
            </Card.Header>
            }

            <Card.Body>
                <Card.Title>
                    <Link to={`/post/${post.postId}`}>{post.title}</Link> {/*Aqui muestra los titulos del post en la parte superior de la tarjeta */}
                    {/*Aqui nos subraya como link y utiliza la ruta  de App.js para enviarnos a la pagina PostDetails y la url muestra el id del post */}
                </Card.Title> 
                <Card.Text>
                    Creado por {post.user.firstName},{moment(post.createdAt).fromNow()}
                    {/*fromNow compara la fecha de creacion y la actual y calcula hace cuanto se creo */}
                    {/*Tarjetas para presentar los posts disponibles donde dice quien lo creo y la fecha */}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}