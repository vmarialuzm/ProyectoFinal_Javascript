const url = "http://127.0.0.1:8000/api/v1/pagos/";

const container = document.querySelector(".row")

async function getMovies(){
    const response = await fetch(url);
    const data = await response.json();
    data.results.forEach((movie) => {
        container.innerHTML += renderMovies(movie);

    })
}

getMovies();

function renderMovies(movie) {
    return `
        <div class="card col-md-3">
            <div class="card-body">
                <h3 class="text-center">${movie.servicio}</h3>
                <p>${movie.monto}</p>
                <p>${movie.fecha_pago}</p>
                <p>${movie.usuario_id}</p>
                <div class="d-grid">
                    <button class="btn btn-outline-primary">
                        Ver detalle
                    </button>
                </div>
            </div>
        </div>
    `;
}