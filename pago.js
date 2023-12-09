const form = document.querySelector("form")
const fechaVencimiento = document.querySelector("#fechaVencimiento");
const servicioPago = document.querySelector("#servicioPago");
const montoPago = document.querySelector("#montoPago");
const token = localStorage.getItem("token.access");
const email = localStorage.getItem("email");

// Funcion para llenar de opciones el select
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
        <option value="${servicio.id}">${servicio.name}</option>
    `;
}

// Funcion para buscar el user_id del usuario logueado
async function getUserId() {
    try {
        const response = await fetch("http://127.0.0.1:8000/usuarios/")
        const data = await response.json();
        const user = data.results.find((user) => user.email === email)
        return user.id
    } catch (error) {
        console.log(error)
    }

}


// Funcion para añadir nuevo pago
form.onsubmit = async function (event) {
    event.preventDefault();
    const userId = await getUserId();

    const body = {
        user_id : userId,
        expiration_date : fechaVencimiento.value,
        service_id : servicioPago.value,
        amount : montoPago.value
    };
    console.log(body)
    try {
        const response = await fetch("http://127.0.0.1:8000/api/v2/payment_user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        Swal.fire({
            text: "Pago creado exitosamente",
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            text: error,
            icon: "error"
        });
    }
};
