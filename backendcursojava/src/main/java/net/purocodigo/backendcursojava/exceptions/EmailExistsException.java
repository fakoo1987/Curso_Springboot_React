package net.purocodigo.backendcursojava.exceptions;

public class EmailExistsException extends RuntimeException{
    
    public EmailExistsException(String message){
        super(message);

    }
}
