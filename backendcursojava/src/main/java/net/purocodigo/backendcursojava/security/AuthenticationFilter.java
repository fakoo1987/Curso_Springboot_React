package net.purocodigo.backendcursojava.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import net.purocodigo.backendcursojava.SpringAplicationContext;
import net.purocodigo.backendcursojava.models.requests.UserLoginRequestModel;
import net.purocodigo.backendcursojava.services.UserServiceInterface;
import net.purocodigo.backendcursojava.shared.dto.UserDto;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    private final AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager){
        //Constructor
        this.authenticationManager = authenticationManager;

    }

    //Es lo que va a traer cuando inentemos loguearnos
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) 
    throws AuthenticationException {
        
        try {
            UserLoginRequestModel userModel = new ObjectMapper().readValue(request.getInputStream(), 
                UserLoginRequestModel.class);
            //UserLoginRequestModel es lo que vamos a estar enviando desde nuestro cliente, se convierte en un objeto
            //de java donde vamos a obtener el email y password

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userModel.getEmail(),
                userModel.getPassword(), new ArrayList<>()));

                //Con este metodo vamos a intentear loguearnos  

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    //Cuando nos logueemos va a traer este metodo   
    @Override
    public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, 
    FilterChain chain, Authentication authentication) throws IOException, ServletException{

        String username = ((User) authentication.getPrincipal()).getUsername();

        String token  = Jwts.builder().setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_DATE))
            .signWith(SignatureAlgorithm.HS512, SecurityConstants.getTokenSecret()).compact();
        //Creaoms el token y asi podemos usar el token en otros endpoints mas adelante 
       
        //añadir el header con el id publico
        UserServiceInterface userService = (UserServiceInterface) SpringAplicationContext.getBean("userService"); 
        //Cuando se crea un bean en la aplicacion, la plicacion lo crea de esta manera userService pero la clase es
        //en realidad UserService la primera ira en minuscula
        UserDto userDto = userService.getUser(username);
        
        //Aparte de los headers ya enviados que envie otros headers, en este caso se envia el header 
        //Authorization donde esta el token y el userId
        response.addHeader("Access-Control-Expose-Headers", "Authorization, UserId");
        //añadir el header con el id publico esto se verifica en el metodo post en el header debajo del token
        response.addHeader("UserId", userDto.getUserId());
       //Aqui se puede devolver otros valore  con los metodos get disponibles como getFirtsName
        response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);

    }
    
}
