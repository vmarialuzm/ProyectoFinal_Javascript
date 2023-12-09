const form = document.querySelector("form")
const exampleInputEmail1 = document.querySelector("#exampleInputEmail1");
const exampleInputPassword1 = document.querySelector("#exampleInputPassword1");

// funcion para loguearme usando mi api creada con drf
form.onsubmit = async function (event) {
    event.preventDefault();

    const body = {
        email : exampleInputEmail1.value,
        password: exampleInputPassword1.value
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/usuarios/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data.tokens.access);
        const token = data.tokens.access
        localStorage.setItem("token.access", token)
        localStorage.setItem("email", body.email)

        Swal.fire({
            text: "Logueado correctamente",
            icon: "success"
        });
        location.href = "/principal.html";

    } catch (error) {
        Swal.fire({
            text: error,
            icon: "error"
        });
    }
};

