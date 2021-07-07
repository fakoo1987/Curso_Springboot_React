package net.purocodigo.backendcursojava;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

//Con esta clase ya podemos acceder a nuestro contexto y podriamos acceder a las bean de clases como AuthenticationFilter
//que no son beans y por esto no podemos Autowire o inyectar otra clase que sea bean

public class SpringAplicationContext implements ApplicationContextAware{

    private static ApplicationContext CONTEXT;

    @Override
    //en setApplicationContext se va poner pplicationContext en CONTEXT
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException{
        
        CONTEXT = applicationContext;
        
    }

    public static Object getBean(String beanName){ //Los beans en jaava son objetos

        return CONTEXT.getBean(beanName);

    }

    

}
//con esta clase podremos acceder al context y podrmos acceder a las beans desde clases como AuthenticationFilter que no
//son Bean y no podemos inyectarlas o autowire en otras clases o servicios