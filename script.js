// Carga lista de películas
const url = 'https://japceibal.github.io/japflix_api/movies-data.json';
let peliculas = [];

// Obtener JSON
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verificar JSON
    peliculas = data;  // Guardar películas cargadas
  })
  .catch(error => {
    console.error("Error al cargar las películas: ", error);
  });

// Buscador de películas
document.getElementById("btnBuscar").addEventListener("click", function () {
    const busqueda = document.getElementById("inputBuscar").value.toLowerCase();
    
    if (busqueda && peliculas.length > 0) {  // Asegurar que la búsqueda y las películas estén cargadas
        const resultados = peliculas.filter(pelicula =>
            // Comparar los campos title, tagline, overview con la búsqueda
            pelicula.title.toLowerCase().includes(busqueda) ||
            pelicula.tagline.toLowerCase().includes(busqueda) ||
            pelicula.overview.toLowerCase().includes(busqueda) ||
            // Buscar dentro de los géneros de la película
            pelicula.genres.some(genero => genero.name.toLowerCase().includes(busqueda))
        );
        mostrarResultados(resultados);  // Mostrar los resultados en la lista
    }
});

// Función que determina cómo se muestran los resultados
function mostrarResultados(resultados) {
    const lista = document.getElementById("lista");
    lista.innerHTML = ''; // Limpiar resultados anteriores

    resultados.forEach(pelicula => {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "text-light", "bg-dark");

        // Mostrar el título, tagline y overview
        item.innerHTML = `
            <h5>${pelicula.title}</h5>
            <p>${pelicula.tagline}</p>
            <p>${pelicula.overview}</p>
        `;

        // Click para mostrar los detalles cuando se selecciona una película
        item.addEventListener("click", () => mostrarDetalles(pelicula));
        lista.appendChild(item);
    });
}

// Mostrar los detalles de las películas cuando se hace click
function mostrarDetalles(pelicula) {
    // Mostrar título y descripción
    document.getElementById("detallesTitulo").innerText = pelicula.title;
    document.getElementById("detallesOverview").innerText = pelicula.overview;
    
    // Mostrar los géneros concatenando los nombres de cada uno
    const generos = pelicula.genres.map(genero => genero.name).join(", ");
    document.getElementById("detallesGeneros").innerText = "Géneros: " + generos;

    // Mostrar la sección de detalles
    const detalles = document.getElementById("detalles");
    detalles.style.display = 'block';

    // Llamar función para mostrar más información
    inforExtra(pelicula);
}

// Mostrar la información extra
function inforExtra(pelicula) {
    // Mostrar datos adicionales de la película
    document.getElementById("detallesAno").innerText = new Date(pelicula.release_date).getFullYear();
    document.getElementById("detallesDuracion").innerText = pelicula.runtime;
    document.getElementById("detallesPresupuesto").innerText = pelicula.budget.toLocaleString();
    document.getElementById("detallesGanancias").innerText = pelicula.revenue.toLocaleString();

    // Añadir evento para mostrar/ocultar info extra
    document.getElementById("btnInfoExtra").addEventListener("click", () => {
        const infoExtra = document.getElementById("infoExtra");
        infoExtra.style.display = infoExtra.style.display === 'none' ? 'block' : 'none';
    });
}
