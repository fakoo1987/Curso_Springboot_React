package net.purocodigo.backendcursojava.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Jwts;

public class AuthorizationFilter extends BasicAuthenticationFilter{


    public AuthorizationFilter(AuthenticationManager authenticationManager) {

        super(authenticationManager);
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException{

        String header = request.getHeader(SecurityConstants.HEADER_STRING);//Request estan todos los headers
        
        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) { // si header esta nulo o no comienza con Bearer
            
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        chain.doFilter(request, response);
        
        
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request){

        String token = request.getHeader(SecurityConstants.HEADER_STRING); //guarda el token que viene de la peticio del header

        if (token != null) {
            
            token = token.replace(SecurityConstants.TOKEN_PREFIX, ""); //Le quita el bearer al token para enviarlo limpio

            //Aqui guarda el correo
            String user = Jwts.parser()
                .setSigningKey(SecurityConstants.getTokenSecret()) //Aqui se asegura que el token firmado venga con la misma clave del TOKEN_SECRET 
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); //Aqui se refiere al correo se puede observar en jwt.io pagina internet

            if (user != null) {

                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                //En esta linea retorna el user(correo electronico), null(password pero no lo hay y no es necesario), 
                //por ultimo el ArrayList de colecciones pero no se necesitan
                
            }
            return null;
        }  
        return null;
    }
    
}
