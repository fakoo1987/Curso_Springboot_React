package net.purocodigo.backendcursojava.exceptions;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import net.purocodigo.backendcursojava.models.responses.ErrorMessage;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value=EmailExistsException.class)//Aqui se pueden poner mas excepciones pero se recomienda
    //hacer para cada excepcion un metodo
    public ResponseEntity<Object> handleEmailExistsException(EmailExistsException ex, WebRequest webRequest){
        
        ErrorMessage errorMessage = new ErrorMessage(new Date(), ex.getMessage());

        return new ResponseEntity<> (errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(value=Exception.class)//Aqui se pueden poner mas excepciones pero se recomienda
    //hacer para cada excepcion un metodo
    public ResponseEntity<Object> handleException(Exception ex, WebRequest webRequest){
        
        ErrorMessage errorMessage = new ErrorMessage(new Date(), ex.getMessage());

        return new ResponseEntity<> (errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
