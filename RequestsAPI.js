
const obtenerUrl = (ruta) => `${RequestsAPI.urlBackend}/${ruta}`
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
}

/* const token = sessionStorage.getItem("session")
if (token) {
    headers.authorization = token;
} */

const procesarResponse = (res) => {
    return res.json().then((data) => {
        if (data.error) {
            throw new Error(data?.error)
        }
        return data
    })
}

const manejarError = (error = new Error("Error desconocido")) => {
    console.error("Ha ocurrido un error:", error.message)
    throw error.message
}


export class RequestsAPI {

    static urlBackend = "https://backend-portfolioweb-9ss8.onrender.com";

    //// proyectos
    static getProyectos(opciones = {}) {
        const queryParams = new URLSearchParams({})

        // filtros
        if (opciones.filtroTipo) {
            queryParams.set("tipo", opciones.filtroTipo)
        }

        return fetch(obtenerUrl("proyectos?" + queryParams))
            .then(procesarResponse)
            .catch(manejarError)
    }

    static getProyectoById(idProyecto) {
        return fetch(obtenerUrl(`proyecto/${idProyecto}`), { headers })
            .then(procesarResponse)
            .catch(manejarError)
    }
}