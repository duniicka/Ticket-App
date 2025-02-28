import { endpoint } from "../api and methods/api"
import controller from "../api and methods/request"
let cards = document.querySelector(".cards")
document.addEventListener("DOMContentLoaded", async () => {
  cards.innerHTML = ""
  const events = await controller.getAll(endpoint.events)
  events.data.forEach(ev => {
    if (ev.category.toLowerCase().includes("popular")) {
      cards.innerHTML +=
        `<div class="card">
            <div class="img-part">
              <img src="${ev.posterURL}" alt="">
            </div>
            <div class="content-part">
              <div class="about-content">
                <h2>${ev.name}</h2>
                <p>${ev.description}</p>
              </div>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="button-part">
              <button  class="buyTicket" data-ticket-id="${ev.id}">Buy <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>`

      const buyBtns = document.querySelectorAll(".buyTicket");
      buyBtns.forEach((buyBtn) => {

        buyBtn.addEventListener("click", function () {
          const eventID = buyBtn.getAttribute("data-ticket-id");
              const newPageUrl = `buy.html?eventID=${eventID}`;
              window.location.href = newPageUrl;
        })
      })
    }
  });

})