import Proyecto from "../Models/Proyecto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir } from "../utils/helpers.js";

const params = new URLSearchParams(window.location.search);
const idProyectoActual = parseInt(params.get("id"));

const mostrarError = (error) => {
    imprimir("error-ampliacion", error);
};

const mostrarAmpliacion = (dataProyectoActual) => {
    console.log("Datos del proyecto actual recibidos:", dataProyectoActual);

    const proyectoActual = new Proyecto(
        dataProyectoActual.id,
        dataProyectoActual.nombre,
        dataProyectoActual.tipo,
        dataProyectoActual.fecha,
        dataProyectoActual.descripcion,
        dataProyectoActual.imgportada,
        dataProyectoActual.imagenes
    );
    imprimir("#data-ampliacion", proyectoActual.mostrarEnAmpliacion());
    document.title = proyectoActual.nombre;




    ////// Siguiente proyecto
    let siguienteProyectoId;
    if (idProyectoActual < 5) {
        siguienteProyectoId = idProyectoActual + 1;
    } else {
        siguienteProyectoId = 1;
    }

    
    RequestsAPI.getProyectoById(siguienteProyectoId)
        .then((dataSiguienteProyecto) => {
            mostrarSiguienteProyecto(dataSiguienteProyecto);
        })
        .catch((error) => {
            console.error("Error al obtener el siguiente proyecto:", error);
        });
};

const mostrarSiguienteProyecto = (dataSiguienteProyecto) => {
    console.log("Datos del siguiente proyecto recibidos:", dataSiguienteProyecto);
    const siguienteProyecto = new Proyecto(
        dataSiguienteProyecto.id,
        dataSiguienteProyecto.nombre,
        dataSiguienteProyecto.tipo,
        dataSiguienteProyecto.fecha,
        dataSiguienteProyecto.descripcion,
        dataSiguienteProyecto.imgportada,
        dataSiguienteProyecto.imagenes
    );

    
    const siguienteProyectoHTML = `
        <section class="section section-proyecto-siguiente">
            <h2>Siguiente proyecto:</h2>
            <div class="proyecto-card" id="${siguienteProyecto.id}">
                <div class="proyecto-card-img">
                    <img src="${siguienteProyecto.imgportada}">
                </div>
                <p class="proyecto-nombre">${siguienteProyecto.nombre}</p>
                <p class="proyecto-tipo">${siguienteProyecto.tipo}</p>
            </div>
        </section>
    `;

    
    const contenedorSiguienteProyecto = document.querySelector("#data-siguiente-proyecto");
    if (contenedorSiguienteProyecto) {
        contenedorSiguienteProyecto.innerHTML = siguienteProyectoHTML;
    } else {
        console.warn("No se encontró el contenedor para el siguiente proyecto.");
    }

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
};

RequestsAPI.getProyectoById(idProyectoActual)
    .then(mostrarAmpliacion)
    .catch((error) => {
        mostrarError(error);
    });



/*const buttonVerProyecto = document.querySelector(".btn-ver-proyecto");
    if (buttonVerProyecto) {
        buttonVerProyecto.addEventListener("click", () => abrirNuevaPestañaProyecto(proyecto));
} */
