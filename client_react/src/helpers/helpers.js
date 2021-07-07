//Funcion para validar si el objeto esta vacio o no
export const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor ===Object;
    //Si no tiene keys o si es igual a cero y el constructor es de tipo object entonces esta vacioel objeto
}

//Convierte un texto a un archivo de texto plato para descargar
export const downloadTextAsFile = (filename, text) => {
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain:charset=utf-8," +  encodeURIComponent(text));//setea los atributos como se quere el archivo
    element.setAttribute("download", filename); //Atributo de descarga del archivo

    element.style.display = "none"; //Que no sea visible en el documento html
    document.body.appendChild(element); //ponemos el elemento en el documento html
    element.click();//Simulamos el click en el ancla
    document.body.removeChild(element); //removemos el elemento del documento html

}