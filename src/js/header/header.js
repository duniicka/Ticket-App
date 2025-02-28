import controller from "../api and methods/request"
import { endpoint } from "../api and methods/api"
import User from "../classes/classes"
const loginRegisterHeader = document.querySelector(".login-register")
window.addEventListener("load", async function (e) {
    const userID = JSON.parse(this.localStorage.getItem("userID"))
    const apiUsers = await controller.getAll(endpoint.users)
    const checkValidLogin = apiUsers.data.find((x) => x.id == userID)
    if (checkValidLogin) {
        loginRegisterHeader.innerHTML = ``
        loginRegisterHeader.innerHTML += `
            <li class="li-header profileLogOut">
                <div class="profilePhotoDiv">
                <a href="./user.html" class ="profilePhoto">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9rKhG6pgOGLs70HP8u6nBJ5OkToBWXPAUg&s" alt = "User profile photo">
                </a>
                </div>
              </li>
              <li class="btn-bgreen">
                <button id="logOut">Log out</button>
              </li>
        `
    }
    const logOut = document.querySelector("#logOut")
    logOut.addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure to log out?",
            text: "You won't be able to revert this!",
            background: "rgb(59, 59, 59)",
            color: "white",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("userID");
                loginRegisterHeader.innerHTML = ``
                loginRegisterHeader.innerHTML += `
            <li class="btn-bgreen li-header login-register-part">
                <a href="./login.html">Login</a>
              </li>
              <li class="btn-bgreen li-header login-register-part">
                <a href="./register.html">Sign up</a>
              </li>
        `
                Swal.fire({
                    title: "Logged out!",
                    text: "User has been logged out!",
                    icon: "success",
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
            setTimeout(() => {
                window.location.href = "./index.html"
            }, 1500)
        });
    })
})