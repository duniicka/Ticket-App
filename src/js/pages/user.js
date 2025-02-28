import { endpoint } from "../api and methods/api.js";
import controller from "../api and methods/request.js";

window.addEventListener("load", async function (e) {
    const userID = JSON.parse(this.localStorage.getItem("userID"));
    const apiUsers = await controller.getAll(endpoint.users);
    const checkValidLogin = apiUsers.data.find((x) => x.id == userID);
    const aboutAccount = document.querySelector(".aboutAccount");

    aboutAccount.innerHTML = `
        <p class="userNameP">Username: <span class="username">${checkValidLogin.username}</span></p>
        <p class="emailP">Email: <span class="email">${checkValidLogin.email}</span></p>
        <p class="balanceP">Balance: <span class="balance">${checkValidLogin.balance}</span></p>
        <p class="spentMoneyP">Spent money: <span class="spentMoney">${checkValidLogin.totalSpentMoney}</span></p>
    `;

    const updatePassword = document.querySelector(".updatePassword");
    updatePassword.addEventListener("click", () => {
        Swal.fire({
            title: 'Enter your details',
            html: `
                <input id="input1" class="swal2-input" style="width: 260px; height: 40px; font-size: 17px;" placeholder="Enter your current password"/>
                <input id="input2" class="swal2-input" style="width: 260px; height: 40px; font-size: 17px;" placeholder="Enter your new password"/>
                <input id="input3" class="swal2-input" style="width: 260px; height: 40px; font-size: 17px;" placeholder="Confirm your new password" />
            `,
            background: "rgb(59, 59, 59)",
            color: "white",
            focusConfirm: false,
            preConfirm: () => {
                const input1 = document.getElementById('input1').value;
                const input2 = document.getElementById('input2').value;
                const input3 = document.getElementById('input3').value;

                if (!input1 || !input2 || !input3) {
                    Swal.showValidationMessage('All fields are required');
                    return false;
                } else if (input2 !== input3) {
                    Swal.showValidationMessage('Passwords do not match');
                    return false;
                } else if (checkValidLogin.password !== input1) {
                    Swal.showValidationMessage('Current password is incorrect');
                    return false;
                }

                return input1, input2, input3;
            },
            confirmButtonText: 'Update password',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const input2 = result.value;
                const confirmResult = await Swal.fire({
                    title: "Do you want to save the changes?",
                    background: "rgb(59, 59, 59)",
                    color: "white",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                });

                if (confirmResult.isConfirmed) {
                    const updatedData = {
                        password: input2
                    };
                    const updateResponse = await controller.update(endpoint.users, updatedData, userID);
                    window.location.reload(); 

                } else if (confirmResult.isDenied) {
                    Swal.fire({
                        text: "Changes are not saved",
                        icon: "info",
                        background: "rgb(59, 59, 59)",
                        color: "white",
                    });
                }
            }
        });
    });

    const updateProfile = document.querySelector(".updateProfile");
    updateProfile.addEventListener("click", () => {
        Swal.fire({
            background: "rgb(59, 59, 59)",
            color: "white",
            title: 'Enter your details',
            html: `
                <input id="input1" class="swal2-input" style="width: 260px; height: 40px; font-size: 17px;" placeholder="New username" value="${checkValidLogin.username}"/>
                <input id="input2" class="swal2-input" style="width: 260px; height: 40px; font-size: 17px;" placeholder="New email" value="${checkValidLogin.email}"/>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const input1 = document.getElementById('input1').value;
                const input2 = document.getElementById('input2').value;
                if (!input1 || !input2) {
                    Swal.showValidationMessage('All fields are required');
                    return false;
                }
                return { input1, input2 };
            },
            confirmButtonText: 'Update profile',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { input1, input2 } = result.value;
                const confirmResult = await Swal.fire({
                    background: "rgb(59, 59, 59)",
                    color: "white",
                    title: "Do you want to save the changes?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                });

                if (confirmResult.isConfirmed) {
                    const updatedData = {
                        username: input1,
                        email: input2,
                    };
                    const updateResponse = await controller.update(endpoint.users, updatedData, userID);
                    window.location.reload(); 
                } else if (confirmResult.isDenied) {
                    Swal.fire({
                        text: "Changes are not saved",
                        icon: "info",
                        background: "rgb(59, 59, 59)",
                        color: "white",
                    });
                }
            }
        });
    });
});
