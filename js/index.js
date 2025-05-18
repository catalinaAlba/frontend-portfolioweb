import Proyecto from "../Models/Proyecto.js"
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir } from "../utils/helpers.js";


const mostrarListaProyectos = (data) => {

    console.log("datos recibidos", data)
    imprimir(".error-listado", "")

    /*     if (data.length === 0) {
            // Si no hay proyectos para mostrar, mostramos un mensaje
            imprimir(".proyectos-listado", "<p>No hay proyectos disponibles para este filtro.</p>");
            return;
        } */

    const listadoProyectos = data
        .map((proyecto) =>
            new Proyecto(proyecto.id, proyecto.nombre, proyecto.tipo, proyecto.fecha, proyecto.descripcion, proyecto.imgportada, proyecto.imagenes).mostrarEnLista()
        )
        .join("");
    imprimir(".proyectos-listado", listadoProyectos);

    

    ////// EVENTO click en card para ampliacion
    document.querySelectorAll(".proyecto-card").forEach((itemListado) => {
        const proyectoImagen = itemListado.querySelector(".proyecto-card-img");
        const proyectoNombre = itemListado.querySelector(".proyecto-nombre");
        const proyectoId = itemListado.getAttribute("id");

        const redireccionarAlProyecto = () => {
            document.location.replace(`ampliacion-proyecto.html?id=${proyectoId}`);
        };

        if (proyectoImagen) {
            proyectoImagen.addEventListener("click", redireccionarAlProyecto);
        }
        if (proyectoNombre) {
            proyectoNombre.addEventListener("click", redireccionarAlProyecto);
        }
    });
}


const mostrarError = (error) => {
    imprimir(".error-listado", error)
}


// sin filtrar
const obtenerProyectos = (filtroTipo = "") => {

    RequestsAPI.getProyectos({ filtroTipo })
        .then(mostrarListaProyectos)
        .catch(mostrarError);
};
obtenerProyectos();