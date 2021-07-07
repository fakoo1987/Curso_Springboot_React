package net.purocodigo.backendcursojava.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import net.purocodigo.backendcursojava.entities.UserEntity;

@Repository  //Para indicar que esta interfaz es un repositorio
public interface UserRepository extends CrudRepository<UserEntity, Long>{
//CrudRepository permite operaciones CRUD, el primer valor nos dice que entidad queremos convertir en un repositorio "UserEntity"
//y el segundo de que tipo de dato es el id "Long" sacado de UserEntity
//Debe ser interface y en CrudRepository recibe: <entidad, y el tipo de dato de la llave primaria>
    UserEntity findByEmail(String email);


    

//Un repositorio nos permite darle funcionalidades crud a una entidad

        
}
