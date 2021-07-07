package net.purocodigo.backendcursojava.controllers;

import java.util.ArrayList;
//port java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.purocodigo.backendcursojava.models.requests.PostCreateRequestModel;
import net.purocodigo.backendcursojava.models.responses.PostRest;
import net.purocodigo.backendcursojava.models.responses.OperationStatusModel;
import net.purocodigo.backendcursojava.services.PostServiceInterface;
import net.purocodigo.backendcursojava.services.UserServiceInterface;
import net.purocodigo.backendcursojava.shared.dto.PostCreationDto;
import net.purocodigo.backendcursojava.shared.dto.PostDto;
import net.purocodigo.backendcursojava.shared.dto.UserDto;


@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    PostServiceInterface postService;

    @Autowired
    ModelMapper mapper;

    @Autowired
    UserServiceInterface userService;

    @PostMapping
    public PostRest createPost(@RequestBody @Validated PostCreateRequestModel createRequestModel){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();//verificamos el usuario autenticado

        String email = authentication.getPrincipal().toString(); //Atrapaos el correo electronico del usuario autenticado

        //ModelMapper mapper = new ModelMapper(); //ya no necesitamos instanciar ya que tenemos el bean de mapper

        PostCreationDto postCreationDto = mapper.map(createRequestModel, PostCreationDto.class);

        postCreationDto.setUserEmail(email);//Como PostsCreateRequestModel no tiene eemail lo sacamos de postscreationdto de arriba de email

        PostDto postDto = postService.createPost(postCreationDto); 
        //retornar el servicio cuando creemos un post
        
        //System.out.println(postCreationDto.getExposureId());
        //System.out.println(postDto.getExposure().getType());
        PostRest postToReturn = mapper.map(postDto, PostRest.class);

        /*if (postToReturn.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
            postToReturn.setExpired(true); //Capitulo 8 video 5
            
        } */
        //System.out.println(postToReturn);
        return postToReturn;
    }
    
    @GetMapping(path = "/last") //http://Localhost:8080/posts/last
    public List<PostRest> lastPosts(){
        List<PostDto> posts = postService.getLastPosts();
        //lista de tipo post dto capitulo 8 video 11

        List<PostRest> postRests = new ArrayList<>();

        for (PostDto post : posts) {
            //ModelMapper mapper = new ModelMapper();
            PostRest postRest = mapper.map(post, PostRest.class);
            postRests.add(postRest);
            
        }

        return postRests;
    }

    @GetMapping(path = "/{id}")
    public PostRest getPost(@PathVariable String id){
        PostDto postDto = postService.getPost(id);

        PostRest postRest = mapper.map(postDto, PostRest.class);
        //Se convierte a post rest

        /*if (postRest.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
            postRest.setExpired(true); //Capitulo 8 video 5  
        } *///Miramos si el post ya expiro

        //Validar si el post es privado o so el post ya expiro Capitulo 8 video 18

        if (postRest.getExposure().getId() == 1 || postRest.getExpired()) {
        //Si e exposure es igual a uno es privado, o si ya espiro

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDto user = userService.getUser(authentication.getPrincipal().toString());
            //Se necesita autenticacion para el post privado

            if (user.getId() != postDto.getUser().getId()) {
                //Si no se esta autenticado no puede acceder al post ybota la excepsion

                throw new RuntimeException("No tienes permiso para realizar esta accion");
                
            }
        }   
        return postRest;
    }
    @DeleteMapping(path = "/{id}")
    public OperationStatusModel deletePost(@PathVariable String id){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto user = userService.getUser(authentication.getPrincipal().toString());

        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setName("DELETE");

        postService.deletePost(id, user.getId());
        operationStatusModel.setResult("SUCESS");

        return operationStatusModel;
    }

    @PutMapping(path = "/{id}")
    public PostRest updatePost(@RequestBody @Validated PostCreateRequestModel postCreateRequestModel,  @PathVariable String id){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto user = userService.getUser(authentication.getPrincipal().toString());

        PostCreationDto postUpdateDto = mapper.map(postCreateRequestModel, PostCreationDto.class);

        PostDto postDto = postService.updatePost(id, user.getId(), postUpdateDto);

        PostRest updatedPost = mapper.map(postDto, PostRest.class);

        return updatedPost;
    }



    
}

