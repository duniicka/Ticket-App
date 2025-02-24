const registerForm = document.querySelector("#registerForm")

import User from "../classes/classes.js";
import controller from "../api and methods/request.js";
import { endpoint } from "../api and methods/api.js";
const registerInput = {
    userName: document.querySelector("#userName"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword")
}

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const apiResponse = await controller.getAll(endpoint.users)
    const duplicateUser = apiResponse.data.find((x) => x.userName == registerInput.userName.value || x.email == registerInput.email.value)


    if (duplicateUser) {
        Swal.fire({
            icon: "error",
            text: "Email or username is already in use!",
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
        return;
    }
    else {
        const newUser = new User(
            registerInput.userName.value.trim(),
            registerInput.email.value.trim(),
            registerInput.password.value.trim()
        );

        if (registerInput.confirmPassword.value != registerInput.password.value) {
            const errorPassword = document.querySelector(".errorPassword")
            errorPassword.innerHTML = "Must be same with password!"
        }
        else {
            Swal.fire({
                title: `Registered succesfully!`,
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
            setTimeout(() => {
                window.location.href = "./login.html"
            }, 1500)
            await controller.post(endpoint.users, newUser)
        }
    }

})

