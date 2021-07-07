package net.purocodigo.backendcursojava.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import net.purocodigo.backendcursojava.services.UserServiceInterface;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter{

    private final UserServiceInterface userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserServiceInterface userService, BCryptPasswordEncoder bCryptPasswordEncoder){
        //Construtor con los dos parametros creados
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{

        http.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.POST, "/users").permitAll()
            .antMatchers(HttpMethod.GET, "/posts/last").permitAll()
            .antMatchers(HttpMethod.GET, "/posts/{id}").permitAll()
            .anyRequest()
            .authenticated().and().addFilter(getAuthenticationFilter()) //Filter que usamos como autenticacion
            .addFilter(new AuthorizationFilter(authenticationManager())) 
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS); //STATELLES cuando se establece una conexion cliente servidor
            //evita que se cree una varable de sesion en el servidor por seguridad, y porque estamos usando el header y el token.       
            //Aqui especificamos que para la URL users los metodos POST de HTTP estan permitidos pero los 
            //demas metodos no
            //tambien genera la url colocando new AuthenticationFilter(authenticationManager()) http://localhost:8080/login 
            //pero se cambia con el metodo getAuthenticationFilter() por lo tanto la url quedaria http://localhost:8080/users/login
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth ) throws Exception{

        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);

    }

    public AuthenticationFilter getAuthenticationFilter() throws Exception{

        final AuthenticationFilter  filter = new AuthenticationFilter(authenticationManager());

        filter.setFilterProcessesUrl("/users/login");
        //Aqui cambiamos la url del login del usuario

        return filter;


    }



}
