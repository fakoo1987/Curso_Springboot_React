package net.purocodigo.backendcursojava.controllers;

import java.util.ArrayList;
//import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.purocodigo.backendcursojava.models.requests.UserDetailRequestModel;
import net.purocodigo.backendcursojava.models.responses.PostRest;
import net.purocodigo.backendcursojava.models.responses.UserRest;
import net.purocodigo.backendcursojava.services.UserServiceInterface;
import net.purocodigo.backendcursojava.shared.dto.PostDto;
import net.purocodigo.backendcursojava.shared.dto.UserDto;

@RestController
@RequestMapping("/users") //URL -> localhost:8080/users
public class UserController {

    @Autowired
    UserServiceInterface userService; //Trae a la clase UserServiceInterface para no crear instancias

    @Autowired
    ModelMapper mapper;

    //Endpoint que devuelve los detalles del susuario en la pagina 
    @GetMapping(produces={MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})    //Especifica que el metodo de abajo es el get de la url 
    //Produces sirve para el soporte en json y xml
    public UserRest getUser(){ //Metodo que se va a llamar cuando la url se llame por el metodo get

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getPrincipal().toString();

        UserDto userDto = userService.getUser(email);

        //ModelMapper mapper = new ModelMapper(); //Nuevo se usa para remplazar BeanUtils
        //ya no necesitamos instanciar ya que tenemos el bean de mapper

        UserRest userToReturn = mapper.map(userDto, UserRest.class); //Nuevo se usa para remplazar BeanUtils

        //UserRest userToReturn = new UserRest(); Anterior se remplaza por ModelMapper
        //BeanUtils.copyProperties(userDto, userToReturn); Anterior se remplaza por ModelMapper

        return userToReturn;
        
        //return "get User Details"; //Trae los detalles del usuario
    }

    //Endpoint publico del login
    @PostMapping    // Especifica que el metodo de abajo es el post de la url 
    public UserRest createUser(@RequestBody @Validated UserDetailRequestModel userDetails){ //este es el metodo que se va a llamar cuando le enviemos una peticion post a la URL
             
        UserRest userToReturn = new UserRest();
        
        UserDto userDto = new UserDto();

        BeanUtils.copyProperties(userDetails, userDto); //Copiar las propiedades de un objeto a otro onjeto

        UserDto createdUser = userService.createUser(userDto);

        BeanUtils.copyProperties(createdUser, userToReturn);

        return userToReturn;

        //De esta forma es mas segura la aplicacion y organizada, porque se puede hacer mas corta pero no es recomendable
    }

    //Cuando se agrega las dependencias de seguridad (security y token) ahoro los endpoints etaran protegidos por contraseña 
    
    @GetMapping(path = "/posts") //URL -> localhost:8080/users/post para entrar a los post del usuario
    public List<PostRest> getPosts(){ //Capitulo 8 video 6

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getPrincipal().toString();

        List<PostDto> posts = userService.getUserPosts(email);
        //Devuelve la lista de los post disponibles del usuario
        //convertir lista de post dto a post rest 
        List<PostRest> postRests = new ArrayList<>();

        for (PostDto post : posts) {
            //ModelMapper mapper = new ModelMapper();
            PostRest postRest = mapper.map(post, PostRest.class);
            
            /*if (postRest.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
                postRest.setExpired(true); //Capitulo 8 video 5
                
            } */           
            postRests.add(postRest);
            
        }

        return postRests;

    }

}



//BeanUtils.copyProperties(userDetails, userDto); //Copiar las propiedades de un objeto a otro onjeto esto se 
//remplazo porque ajora el dto necesita devolver una lista dentro del objeto, ahora se usa la dependencia
//ModelMapper la cual hay que instalarla
