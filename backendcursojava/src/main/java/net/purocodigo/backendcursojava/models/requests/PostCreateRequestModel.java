package net.purocodigo.backendcursojava.models.requests;

public class PostCreateRequestModel {

    private String title;
    //El titulo del post

    private String content;
    //Se envia desde el cliente el cotenido del post que quiere crear

    private long exposureId ;
    //Se envia desde el cliente si el post es privado o publico

    private int expirationTime;
    //Expiracion del post

    /* Asi se envia la petticion o Request del usuario en postman
    {
        "tittle": "freddy",
        "content": "que",
        "exposureId": 2,
        "expirationTime": 60
    }

    */


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

    public long getExposureId() {
        return this.exposureId;
    }

    public void setExposureId(long exposureId) {
        this.exposureId = exposureId;
    }

    public int getExpirationTime() {
        return this.expirationTime;
    }

    public void setExpirationTime(int expirationTime) {
        this.expirationTime = expirationTime;
    }

    
}
