package net.purocodigo.backendcursojava.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.purocodigo.backendcursojava.entities.ExposureEntity;
import net.purocodigo.backendcursojava.entities.PostEntity;
import net.purocodigo.backendcursojava.entities.UserEntity;
import net.purocodigo.backendcursojava.repositories.ExposureRepository;
import net.purocodigo.backendcursojava.repositories.PostRepository;
import net.purocodigo.backendcursojava.repositories.UserRepository;
import net.purocodigo.backendcursojava.shared.dto.PostCreationDto;
import net.purocodigo.backendcursojava.shared.dto.PostDto;

@Service
public class PostService implements PostServiceInterface{

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ExposureRepository exposureRepository;

    @Autowired
    ModelMapper mapper;

    @Override
    public PostDto createPost(PostCreationDto post) {

        UserEntity userEntity = userRepository.findByEmail(post.getUserEmail());
        //Se guarda el usuario 
        ExposureEntity exposureEntity = exposureRepository.findById(post.getExposureId());
        //Se guarda el id del exposure

        PostEntity postEntity = new PostEntity();
        //Objeto que se va a guardar en la base de datos
        //Se setean los campos
        postEntity.setUser(userEntity);
        postEntity.setExposure(exposureEntity);
        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setPostId(UUID.randomUUID().toString());
        postEntity.setExpiresAt(new Date(System.currentTimeMillis() + (post.getExpirationTime() * 60000)));
        
        PostEntity createdPost = postRepository.save(postEntity);

        //ModelMapper mapper = new ModelMapper(); ya no necesitamos instanciar ya que tenemos el bean de mapper
        PostDto postToReturn = mapper.map(createdPost, PostDto.class);
        //PostRepository.
        return postToReturn;
    }

    @Override
    public List<PostDto> getLastPosts() {
        long publicExposureId = 2;
        List<PostEntity> postEntities = postRepository.getLastPublicPosts(publicExposureId, new Date(System.currentTimeMillis()));
        
        List<PostDto> postDtos = new ArrayList<>();

        for(PostEntity post: postEntities){
            PostDto postDto = mapper.map(post, PostDto.class);
            postDtos.add(postDto);
        }
        
        return postDtos;

    }

    @Override
    public PostDto getPost(String postId) {

        PostEntity postEntity = postRepository.findByPostId(postId);
        PostDto postDto = mapper.map(postEntity, PostDto.class);
        return postDto;
    }

    @Override
    public void deletePost(String postId, long userId) {
        PostEntity postEntity = postRepository.findByPostId(postId);
        if (postEntity.getUser().getId() != userId) {
            //Si el usuario del post es diferente al usuario autenticado userId
            throw new RuntimeException("No se puede realizar esta accion");
            
        }

        postRepository.delete(postEntity);
        
    }

    @Override
    public PostDto updatePost(String postId, long userId, PostCreationDto postUpdateDto) {
        PostEntity postEntity = postRepository.findByPostId(postId);
        if (postEntity.getUser().getId() != userId)
            //Si el usuario del post es diferente al usuario autenticado userId
            throw new RuntimeException("No se puede realizar esta accion");
            
        ExposureEntity exposureEntity = exposureRepository.findById(postUpdateDto.getExposureId());

        postEntity.setExposure(exposureEntity);
        postEntity.setTitle(postUpdateDto.getTitle());
        postEntity.setContent(postUpdateDto.getContent());
        postEntity.setExpiresAt(new Date(System.currentTimeMillis() + (postUpdateDto.getExpirationTime() * 60000)));

        PostEntity updatedPost = postRepository.save(postEntity);
        PostDto postDto = mapper.map(updatedPost, PostDto.class);

        return postDto;
    }

    
    
}

