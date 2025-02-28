import "tailwindcss";
import {hover} from "./hover-ticket/hover";
hover()
import controller from "./api and methods/request";
import { endpoint } from "./api and methods/api";
import { addEvents } from "./helper/helper";
const heading = document.querySelector("#slide-heading")

let swiperWrapper = document.querySelector("#swiper-wrapper")
document.addEventListener("DOMContentLoaded", async ()=>{
    const events = await controller.getAll(endpoint.events)
    addEvents(heading, events, swiperWrapper)
})


var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 2000,
    },
    speed: 600,

    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  });

var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    loopAdditionalSlides: 1,
    slidesPerView: "auto",
    spaceBetween: 20,
    autoplay: {
      delay: 2000,
    },
    speed: 600,
});

