//Componente para cargar una imagen cuando no se tengan post y este vacio todo
import nada from  "../../assets/nada.svg";

export default function NoPost({ text }) {
 
    return (
        <div className="no-posts-component"> 
            <div className="post-image-container">
                <object type="image/svg+xml" data={nada}>
                    Error al cargar svg
                </object>
                <p>{ text }</p>
            </div>
        </div>
    );
}