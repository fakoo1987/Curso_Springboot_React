package net.purocodigo.backendcursojava.models.responses;

import java.util.Date;

//Clase para retornar al usuario informacion despues de crear el post
public class PostRest {
    private String postId;

    private String title;

    private String content;

    private Date expiresAt;

    private Date createdAt;

    private Boolean expired = false;

    private UserRest user;

    private ExposureRest exposure;

    

    //Lo retrorna en el post que se realiza en postman

    /* Esto es lo que retorna el servidor al hacer el request o peticion desde PostCreateRequestModel
        {
            "postId": "fe84e51d-3d5d-47a2-b8e7-a028d28e7ad0",
            "tittle": "freddy",
            "content": "que",
            "expiresAt": "2021-06-26T00:44:14.963+00:00",
            "createdAt": "2021-06-25T23:44:15.055+00:00",
            "expired": false,
            "user": {
                "userId": "cb547673-c53a-4824-a977-45e779d84b4e",
                "firstName": "Freddy",
                "lastName": "Cepeda",
                "email": "fako@hotmail.com"
            },
            "exposure": null
        }
    */


    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getExpiresAt() {
        return this.expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean isExpired() {
        return this.expired;
    }

    public Boolean getExpired() {
        return this.expired;
    }

    public void setExpired(Boolean expired) {
        this.expired = expired;
    }

    public UserRest getUser() {
        return this.user;
    }

    public void setUser(UserRest user) {
        this.user = user;
    }

    public ExposureRest getExposure() {
        return this.exposure;
    }

    public void setExposure(ExposureRest exposure) {
        this.exposure = exposure;
    }


}
