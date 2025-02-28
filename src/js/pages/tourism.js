import { endpoint } from "../api and methods/api";
import controller from "../api and methods/request";
let cards = document.querySelector(".cards");
document.addEventListener("DOMContentLoaded", async () => {
  cards.innerHTML = "";
  const events = await controller.getAll(endpoint.events);
  let favoriteEvents = JSON.parse(localStorage.getItem("favoriteEvents")) || [];
  events.data.forEach((ev) => {
    if (ev.category.toLowerCase().includes("tourism")) {
      cards.innerHTML += `
        <div class="card">
          <div class="img-part">
            <img src="${ev.posterURL}" alt="">
          </div>
          <div class="content-part">
            <div class="about-content">
              <h2>${ev.name}</h2>
              <p>${ev.description}</p>
            </div>
            <i class="fa-regular fa-heart notAddedFav" data-event-id="${ev.id}"></i>
          </div>
          <div class="button-part">
            <button class="buyTicket" data-ticket-id="${ev.id}">Buy <i class="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>
      `;
      const heartIcon = document.querySelector(`i[data-event-id="${ev.id}"]`);
      if (favoriteEvents.includes(ev.id.toString())) {
        heartIcon.classList.add("addedFavHeart", "fa-solid");
        heartIcon.classList.remove("notAddedFav");
      }
      const buyBtns = document.querySelectorAll(".buyTicket");
      buyBtns.forEach((buyBtn) => {
        buyBtn.addEventListener("click", function () {
          const eventID = buyBtn.getAttribute("data-ticket-id");
          const newPageUrl = `buy.html?eventID=${eventID}`;
          window.location.href = newPageUrl;
        });
      });
      let favoriteBtns = document.querySelectorAll(".notAddedFav, .addedFavHeart");
      favoriteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const eventID = btn.getAttribute("data-event-id");
          if (btn.classList.contains("notAddedFav")) {
            if (!favoriteEvents.includes(eventID)) {
              favoriteEvents.push(eventID);
            }
            btn.classList.add("addedFavHeart", "fa-solid");
            btn.classList.remove("notAddedFav");
          } else {
            favoriteEvents = favoriteEvents.filter((id) => id !== eventID);
            btn.classList.remove("addedFavHeart", "fa-solid");
            btn.classList.add("notAddedFav");
          }
          localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents));
        });
      });
    }
  });
});
