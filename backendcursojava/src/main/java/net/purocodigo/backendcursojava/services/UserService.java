package net.purocodigo.backendcursojava.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import net.purocodigo.backendcursojava.entities.PostEntity;
import net.purocodigo.backendcursojava.entities.UserEntity;
import net.purocodigo.backendcursojava.exceptions.EmailExistsException;
import net.purocodigo.backendcursojava.repositories.PostRepository;
import net.purocodigo.backendcursojava.repositories.UserRepository;
import net.purocodigo.backendcursojava.shared.dto.PostDto;
import net.purocodigo.backendcursojava.shared.dto.UserDto;

//Cuando se crea un bean en la aplicacion, la aplicacion lo crea de esta manera userService la primera ira en minuscula, pero la clase es
//en realidad UserService.java -> este bean se crea en AuthenticationFilter.java
@Service 
public class UserService implements UserServiceInterface{

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    //Inyeccion del metodo para encriptar el password

    @Autowired
    ModelMapper mapper;

    @Override
    public UserDto createUser(UserDto user) {
        
        //Metodo para crear el usuario

        if (userRepository.findByEmail(user.getEmail()) != null) 
            throw new EmailExistsException("El correo electronico ya existe");

        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);

        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword())); 
        //Linea para encrptar el password

        UUID userId = UUID .randomUUID();

        userEntity.setUserId(userId.toString());

        UserEntity storedUserDetails = userRepository.save(userEntity);
       
        UserDto userToReturn = new UserDto();
        BeanUtils.copyProperties(storedUserDetails, userToReturn);

        return userToReturn;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
            
        }

        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), new ArrayList<>());
    }

    @Override
    public UserDto getUser(String email) {
        
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
            
        }

        UserDto userToReturn = new UserDto();

        BeanUtils.copyProperties(userEntity, userToReturn);

        return userToReturn;
    }

    @Override
    public List<PostDto> getUserPosts(String email) {
        
        UserEntity userEntity = userRepository.findByEmail(email);
        //Se obtiene el id del usuario logueado
        List<PostEntity> posts = postRepository.getByUserIdOrderByCreatedAtDesc(userEntity.getId());
        //  lista de tipo postEntity la cual es la que nos envia o devuelve el postRepository

        List<PostDto> postDtos = new ArrayList<>();
        //Transformar ista de postEntity a postDto

        for (PostEntity post : posts) {
         
            PostDto postDto = mapper.map(post, PostDto.class);
            postDtos.add(postDto);

        }
        return postDtos;
    }

    
}
