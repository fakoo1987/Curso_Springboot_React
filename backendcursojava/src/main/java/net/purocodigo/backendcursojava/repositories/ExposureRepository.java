package net.purocodigo.backendcursojava.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import net.purocodigo.backendcursojava.entities.ExposureEntity;

@Repository  //Para indicar que esta interfaz es un repositorio
public interface ExposureRepository extends CrudRepository<ExposureEntity, Long>{
//CrudRepository permite operaciones CRUD, el primer valor nos dice que entidad queremos convertir en un repositorio "UserEntity"
//y el segundo de que tipo de dato es el id "Long" sacado de UserEntity
    ExposureEntity findById(long id);
//Un repositorio nos permite darle funcionalidades crud a una entidad
        
}
