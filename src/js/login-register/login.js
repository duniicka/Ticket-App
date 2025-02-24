const loginForm = document.querySelector(".login")
const loginInputs = {
    username: document.querySelector("#userName"),
    password: document.querySelector("#password")
}

import controller from "../api and methods/request";
import { endpoint } from "../api and methods/api";

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const apiResponse = await controller.getAll(endpoint.users)
    const checkValidUser = apiResponse.data.find((x) => {
        return x.username == loginInputs.username.value &&
            x.password == loginInputs.password.value
    })

    if (checkValidUser) {
        Swal.fire({
            title: `Welcome back, ${checkValidUser.username}`,
            background: "rgb(59, 59, 59)",
            icon: "success",
            color: "white",
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = 'rgb(17, 17, 17)';
                confirmButton.style.color = 'white';
                confirmButton.style.borderRadius = '5px';
                confirmButton.style.padding = '10px 20px';
            }
        });

        localStorage.setItem("userID", JSON.stringify(checkValidUser.id))
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 1500)
    }
    else {
        loginInputs.username.value=""
        loginInputs.password.value=""
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            background: "rgb(59, 59, 59)",
            color: "white",
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = 'rgb(17, 17, 17)';
                confirmButton.style.color = 'white';
                confirmButton.style.borderRadius = '5px';
                confirmButton.style.padding = '10px 20px';
            }
        });
    }
})
