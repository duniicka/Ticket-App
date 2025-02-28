import { endpoint } from "../api and methods/api";
import controller from "../api and methods/request";
document.addEventListener("DOMContentLoaded", async () => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
    let favoriteEventIds = JSON.parse(localStorage.getItem("favoriteEvents")) || [];
    const events = await controller.getAll(endpoint.events);
    const favoriteEvents = events.data.filter((ev) =>
        favoriteEventIds.includes(ev.id.toString())
    );
    favoriteEvents.forEach((ev) => {
        cards.innerHTML += `
        <div class="card">
            <div class="img-part">
                <img src="${ev.posterURL}" alt="${ev.name}">
            </div>
            <div class="content-part">
                <div class="about-content">
                    <h2>${ev.name}</h2>
                    <p>${ev.description}</p>
                </div>
                <i class="fa-solid fa-heart addedFavHeart" data-event-id="${ev.id}"></i> <!-- Fill the heart for favorite events -->
            </div>
            <div class="button-part">
                <button class="buyTicket" data-ticket-id="${ev.id}">Buy <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
        `;
    });
    const buyBtns = document.querySelectorAll(".buyTicket");
    buyBtns.forEach((buyBtn) => {
        buyBtn.addEventListener("click", function () {
            const eventID = buyBtn.getAttribute("data-ticket-id");
            const newPageUrl = `buy.html?eventID=${eventID}`;
            window.location.href = newPageUrl;
        });
    });

    const favoriteBtns = document.querySelectorAll(".notAddedFav, .addedFavHeart");
    favoriteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const eventID = btn.getAttribute("data-event-id");
            if (btn.classList.contains("notAddedFav")) {
                if (!favoriteEventIds.includes(eventID)) {
                    favoriteEventIds.push(eventID);
                }
                btn.classList.add("addedFavHeart", "fa-solid");
                btn.classList.remove("notAddedFav", "fa-regular");
            } else {
                favoriteEventIds = favoriteEventIds.filter((id) => id !== eventID);
                btn.classList.remove("addedFavHeart", "fa-solid");
                btn.classList.add("notAddedFav", "fa-regular");
            }
            localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEventIds));
        });
    });
});
