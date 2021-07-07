const API_URL= "http://localhost:8080"; //Url api la sacamos de postman la primera

//creamos nuestro primer enpoint para el inicio de sesion
export const LOGIN_ENDPOINT = API_URL + "/users/login";
export const REGISTER_ENDPOINT = API_URL + "/users";
export const PUBLIC_POST_ENDPOINT = API_URL + "/posts/last";
export const POST_DETAILS_ENDPOINT = API_URL + "/posts";
export const USER_POST_ENDPOINT = API_URL + "/users/posts";
export const CREATE_POST_ENDPOINT = API_URL + "/posts"; //Capitulo 12 video 17
export const DELETE_POST_ENDPOINT = API_URL + "/posts"; //Capitulo 12 video 20
export const UPDATE_POST_ENDPOINT = API_URL + "/posts"; //Capitulo 12 video 22
