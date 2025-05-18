export default class Proyecto {
    id;
    nombre;
    tipo;
    fecha;
    descripcion;
    imgportada;
    imagenes;

    constructor(id = 0, nombre = "", tipo = "", fecha = "", descripcion = "", imgportada = "", imagenes = "") {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.imgportada = imgportada;
        this.imagenes = imagenes;
    }


    mostrarEnLista() {


        return `
            <div class="proyecto-card" id="${this.id}" data-nombre-proyecto="${this.nombre}">
                  <div class="proyecto-card-img">
                      <img src="${this.imgportada}">
                  </div>
                <p class="proyecto-nombre">${this.nombre}</p>
                <p class="proyecto-tipo">${this.tipo}</p>
            </div>
        `;
    }



    mostrarEnAmpliacion() {

        return `
            <section class="section section-proyecto-ampliacion">
                <div class="proyecto-info">
                    <div class="info-img">
                        <img src="${this.imgportada}">
                    </div>
                    <div class="info-cuadro">
                        <h1 class="info-nombre">${this.nombre}</h1>
                        <p class="info-descripcion">${this.descripcion}</p>
                        <div class="info-datos">
                            <p class="info-descripcion"><span class="txt-negrita">Área</span><br>${this.tipo}</p>
                            <p class="info-fecha"><span class="txt-negrita">Año</span><br>${this.fecha}</p>
                        </div>
                    </div>
                </div>

                <div class="proyecto-galeria">
                    <div class="galeria-img">
                        <img src="${this.imagenes[0]}">
                    </div>
                    <div class="galeria-img">
                        <img src="${this.imagenes[1]}">
                    </div>
                    <div class="galeria-img">
                        <img src="${this.imagenes[2]}">
                    </div>
                    <div class="galeria-img">
                        <img src="${this.imagenes[3]}">
                    </div>
                </div>
            </section>
        `;
    }

}

