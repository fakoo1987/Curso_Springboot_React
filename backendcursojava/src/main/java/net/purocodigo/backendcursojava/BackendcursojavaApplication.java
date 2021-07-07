package net.purocodigo.backendcursojava;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import net.purocodigo.backendcursojava.models.responses.UserRest;
import net.purocodigo.backendcursojava.security.AppProperties;
import net.purocodigo.backendcursojava.shared.dto.PostDto;
import net.purocodigo.backendcursojava.shared.dto.UserDto;

@SpringBootApplication
@EnableJpaAuditing
public class BackendcursojavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendcursojavaApplication.class, args);
		System.out.println("Funcionando");

		List<PostDto> postDto = new ArrayList<>();
		System.out.println(postDto);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder(){
		return new BCryptPasswordEncoder();
		//Metodo para encrptar el password
	}

	@Bean
	public SpringAplicationContext springAplicationContext(){
		return new SpringAplicationContext();
	}

	@Bean(name="AppProperties") //key sereta deonde se van a generar los tokens
	public AppProperties getAppProperties(){
		return new AppProperties();
	}

	@Bean
	public ModelMapper modelMapper(){
		ModelMapper mapper = new ModelMapper();

		mapper.typeMap(UserDto.class, UserRest.class).addMappings(m -> m.skip(UserRest::setPosts));

		return mapper;
	}

	

}
