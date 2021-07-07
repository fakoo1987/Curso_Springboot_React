package net.purocodigo.backendcursojava.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import net.purocodigo.backendcursojava.entities.PostEntity;


@Repository
//public interface PostRepository extends CrudRepository<PostEntity , Long> {
public interface PostRepository extends PagingAndSortingRepository<PostEntity , Long> {
 //Emplea metodos crud pero adicionalmente usa paginacion y ordenamiento de datos
 List<PostEntity> getByUserIdOrderByCreatedAtDesc(long userId); 
 //Busca el listado de acuerdo a la relacion de base de datos UserId, y lo ordena  por la creacion descendente 
  //Metodo que devuelva los post del usuario
  @Query(value = "SELECT * FROM posts p WHERE p.exposure_id = :exposure and p.expires_at > :now ORDER BY created_at DESC LIMIT 20", nativeQuery = true)
  //Aqui se establece el tipo de query que queremos usar en nuestro caso query nativo
  List<PostEntity> getLastPublicPosts(@Param("exposure") long exposureId, @Param("now") Date now);

  PostEntity findByPostId(String postId);
  //Metodo que va buscar en la tabla post la columna id 

    
}
