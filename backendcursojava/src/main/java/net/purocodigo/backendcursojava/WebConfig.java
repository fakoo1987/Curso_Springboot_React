package net.purocodigo.backendcursojava;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//Clase donde especificamos cuales son los metos, origenes y headers que nuestra aplicacion intercambie info con otras aplicaciones
@Configuration
public class WebConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry registry){
        //Que endpoints tengan soporte de cors en este caso todos
        //
        //OPTIONS es el metodo que se envia primero para saber si la aplicacion soporta cors o no, sin este os demas no funcionan
        registry.addMapping("/**").allowedMethods("*").allowedOrigins("*").allowedHeaders("*");
        //En producion allowOrigins se ponde la url que se necesita 
    }


    
}
