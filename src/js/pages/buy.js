import { endpoint } from "../api and methods/api.js";
import controller from "../api and methods/request.js";

const apiUsers = await controller.getAll(endpoint.users);
const userID = JSON.parse(localStorage.getItem("userID"));
const checkValidLogin = apiUsers.data.find((x) => x.id == userID);
const ticketDetails = document.querySelector(".ticketDetails")

setTimeout(async () => {
    console.log("salam");
    const tickets = await controller.getAll(endpoint.tickets);
    const events = await controller.getAll(endpoint.events);
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get('eventID');
    ticketDetails.innerHTML = "";
    const selectedTicket = tickets.data.find(ticket => ticket.eventId == eventID);
    ticketDetails.innerHTML += `
        <div class="movieImg">
            <img src="${events.data[eventID - 1].posterURL}" alt="">
        </div>
        <div class="buyPart">
            <div class="aboutMovie">
                <h1>${events.data[eventID - 1].name}</h1>
                <p>${events.data[eventID - 1].description}</p>
            </div>
            <div class="aboutBuyingDetails">
                <p class="price">                
                    Price: <span class="priceNum">${selectedTicket.price}</span> $
                </p>
                <p class="chooseCount">
                    <span class="decrease">-</span>
                    <span>Count: <span class="count">0</span></span>
                    <span class="increase">+</span>
                </p>
                <p class="totalPrice">
                    Total Price: <span class="totalPriceNum">0</span> $
                </p>
            </div>
            <button class="btn-bgreen buyTickets">Buy</button>
        </div>
    `;


    const decrease = document.querySelector(".decrease");
    const increase = document.querySelector(".increase");
    const count = document.querySelector(".count");
    let price = document.querySelector(".priceNum");
    let totalPrice = document.querySelector(".totalPriceNum");
    increase.addEventListener("click", () => {
        count.innerHTML = Number(count.innerHTML) + 1;
        totalPrice.innerHTML = Number(count.innerHTML) * Number(price.innerHTML);
    });

    decrease.addEventListener("click", () => {
        if (Number(count.innerHTML) > 0) {
            count.innerHTML = Number(count.innerHTML) - 1;
            totalPrice.innerHTML = Number(count.innerHTML) * Number(price.innerHTML);
        }
    });

    const buyTickets = document.querySelector(".buyTickets");

    buyTickets.addEventListener("click", async () => {
        const userID = JSON.parse(localStorage.getItem("userID"));
        const apiResponse = await controller.getById(endpoint.users, userID);

        if (totalPrice.innerHTML == "0") {
            Swal.fire({
                text: "You can't buy a ticket.",
                icon: "error",
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
        else if (apiResponse.data.balance < Number(totalPrice.innerHTML)) {
            Swal.fire({
                text: "There is not enough balance!",
                icon: "error",
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

        let updateBalance = apiResponse.data.balance - Number(totalPrice.innerHTML);
        let updatedUser = { ...apiResponse.data, balance: updateBalance };
        const updateResponse = await controller.update(endpoint.users, updatedUser, userID);

        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure to buy it?",
            icon: "warning",
            showCancelButton: true,
            background: "rgb(59, 59, 59)",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, buy it!",
            color: "white",
        }).then((result) => {
            if (result.isConfirmed) {
                if (!updateResponse.error) {
                    Swal.fire({
                        title: "Ticket bought successfully!",
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
                    checkValidLogin.balance = updateBalance;
                } else {
                    Swal.fire({
                        text: "Something went wrong!",
                        icon: "error",
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
            }
        });
    });
}, 1)