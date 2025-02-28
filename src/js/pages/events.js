import { addEvents } from "../helper/helper"
import { endpoint } from "../api and methods/api"
import controller from "../api and methods/request"
let swiperWrapper1 = document.querySelector(".swiper-wrapper1")
let swiperWrapper2 = document.querySelector(".swiper-wrapper2")
let swiperWrapper3 = document.querySelector(".swiper-wrapper3")
const swiperHeading1=document.querySelector(".swiper-heading1")
const swiperHeading2=document.querySelector(".swiper-heading2")
const swiperHeading3=document.querySelector(".swiper-heading3")

document.addEventListener("DOMContentLoaded", async ()=>{
    const events = await controller.getAll(endpoint.events)
    addEvents(swiperHeading1, events, swiperWrapper1)
    addEvents(swiperHeading2, events, swiperWrapper2)
    addEvents(swiperHeading3, events, swiperWrapper3)
})
