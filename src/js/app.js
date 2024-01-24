document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    crearMap();
    redesSociales();
    scrollNavegacion();
    fijarBarra();
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagenes = document.createElement("picture");
        imagenes.innerHTML = `
            <source srcset="build/img/galeria/${i}.avif" type="image/avif">
            <source srcset="build/img/galeria/${i}.webp" type="image/webp">
            <img src="build/img/galeria/${i}.jpg" alt="Imagen de Galeria">
        `;

        galeria.appendChild(imagenes);

        imagenes.onclick = function () {
            mostrarImagen(i);
        }
    }
}


function mostrarImagen(id) {
    const imagen = document.createElement("picture");

    imagen.innerHTML = `
        <source srcset="build/img/galeria/${id}.avif" type="image/avif">
        <source srcset="build/img/galeria/${id}.wep" type="image/webp">
        <img src="build/img/galeria/${id}.jpg" alt="Imagen Galeria">
    `;

    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    }

    const cerrarImagen = document.createElement("P");
    cerrarImagen.textContent = "X";
    cerrarImagen.classList.add("btn-cerrar");

    cerrarImagen.onclick = function () {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    }


    overlay.appendChild(cerrarImagen);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}



function crearMap() {

    const mapa = L.map("map").setView([19.883844775895923, -103.60133129095314], 20);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const marker = L.marker([19.883844775895923, -103.60133129095314], { icon: redIcon }).addTo(mapa);
}

function redesSociales() {
    const facebook = document.querySelector(".facebook");
    facebook.onclick = function() {
        window.open("https://www.facebook.com/profile.php?id=100063594061661");
    }

    const instagram = document.querySelector(".instagram");
    instagram.onclick = function() {
        window.open("https://www.instagram.com/luna_cafe_te/");
    }
}


function scrollNavegacion() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        })
    });

}

function fijarBarra() {
    const barra = document.querySelector(".header");
    const posicionSalidaBarra = document.querySelector(".contenido-sobre-nosotros");
    const body = document.querySelector("body");
    console.log(posicionSalidaBarra.getBoundingClientRect());

    window.addEventListener("scroll",function() {
        if (posicionSalidaBarra.getBoundingClientRect().bottom < 0) {
            barra.classList.add("fijo");
            body.classList.add("scroll-fijo");
        } else {
            barra.classList.remove("fijo");
            body.classList.remove("scroll-fijo");
        }
    }); 
}