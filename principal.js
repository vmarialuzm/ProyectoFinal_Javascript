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
        <div class="card mb-3">
            <div class="card-body">
                <span><img src="${pago.service_id.logo}" class="img-fluid" style="height: 30px;" alt=""></span>
                <span>${pago.service_id.name}</span>
                <span>${pago.payment_date}</span>
                <span>${pago.amount}</span>
            </div>
        </div>
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
        <div class="card mb-3">
            <div class="card-body">
                <span><img src="${pago.payment_user_id.service_id.logo}" class="img-fluid" style="height: 30px;" alt=""></span>
                <span>${pago.payment_user_id.service_id.name}</span>
                <span>${pago.payment_user_id.payment_date}</span>
                <span>${pago.payment_user_id.amount}</span>
                <span>${pago.penalty_fee_amount}</span>
            </div>
        </div>
    `;
}