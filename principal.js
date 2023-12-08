const pagosRealizados = document.querySelector("#pagosVencidos");
const pagosVencidos = document.querySelector("#pagosVencidos");

const token = localStorage.getItem("token.access")
console.log(token)




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