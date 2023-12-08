const pagosRealizados = document.querySelector("#pagosRealizados");
const pagosVencidos = document.querySelector("#pagosVencidos");

const token = localStorage.getItem("token.access")
console.log(token)


// Funcion para pagos realizados
async function getPagosRealizados() {
    const response = await fetch("http://127.0.0.1:8000/api/v2/payment_user/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    data.results.forEach((pagoRealizado) => {
        pagosRealizados.innerHTML += renderPagosRealizados(pagoRealizado);
    })
}

getPagosRealizados();

function renderPagosRealizados(pago) {
    return `
        <p>${pago.id}</p>
        <p>${pago.amount}</p>
        <p>${pago.payment_date}</p>
        <p>${pago.expiration_date}</p>
        <p>${pago.user_id}</p>
        <p>${pago.service_id}</p>
    `;
}


// Funcion para pagos vencidos
async function getPagosVencidos() {
    const response = await fetch("http://127.0.0.1:8000/api/v2/expired_payments/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data)
    data.results.forEach((pagoVencido) => {
        pagosVencidos.innerHTML += renderPagosVencidos(pagoVencido);
    })
}

getPagosVencidos();


function renderPagosVencidos(pago) {
    return `
        <p>${pago.id}</p>
        <p>${pago.penalty_fee_amount}</p>
        <p>${pago.payment_user_id}</p>
    `;
}