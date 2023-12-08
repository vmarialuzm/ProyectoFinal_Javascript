const servicioPago = document.querySelector("#servicioPago");
const token = localStorage.getItem("token.access")

// Funcion para llevar de opciones el select
async function getServices() {
    const response = await fetch("http://127.0.0.1:8000/api/v2/services/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    data.results.forEach((servicio) => {
        servicioPago.innerHTML += renderServicios(servicio);
    })
}

getServices();

function renderServicios(servicio) {
    return `
        <option value="${servicio.name}">${servicio.name}</option>
    `;
}