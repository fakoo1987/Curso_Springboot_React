package net.purocodigo.backendcursojava.security;

import net.purocodigo.backendcursojava.SpringAplicationContext;

public class SecurityConstants {

    public static final long EXPIRATION_DATE = 864000000; //Especificamos la duracion del token 10 dias
    public static final String TOKEN_PREFIX = "Bearer "; //Json web token
    public static final String HEADER_STRING = "Authorization"; //donde se envia el Json web token
    public static final String SIGN_UP_URL = "/users"; //URL deonde los usuarios se van a registrar
    //key sereta deonde se van a generar los tokens

    public static String getTokenSecret(){
        AppProperties appProperties = (AppProperties) SpringAplicationContext.getBean("AppProperties");
        return appProperties.getTokenSecret();
    }
    
}
