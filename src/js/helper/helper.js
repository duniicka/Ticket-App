export function addEvents(heading, events, swiper) {
    swiper.innerHTML = "";
    const headingText = heading.innerHTML.toLowerCase();
    events.data.forEach(ev => {
        if (headingText.includes("kids") && ev.category.toLowerCase().includes("kids")) {
            swiper.innerHTML += `
                <div class="swiper-slide">
                    <img data-ticket-id="${ev.id}" class="swiperImg" src="${ev.posterURL}" alt="${ev.category}">
                </div>
            `;
        }
        if (headingText.includes("popular") && ev.category.toLowerCase().includes("popular")) {
            swiper.innerHTML += `
                <div class="swiper-slide">
                    <img data-ticket-id="${ev.id}" class="swiperImg" src="${ev.posterURL}" alt="${ev.category}">
                </div>
            `;
        }
        if (headingText.includes("tourism") && ev.category.toLowerCase().includes("tourism")) {
            swiper.innerHTML += `
                <div class="swiper-slide">
                    <img data-ticket-id="${ev.id}" class="swiperImg" src="${ev.posterURL}" alt="${ev.category}">
                </div>
            `;
        }
        if (headingText.includes("weekend") && ev.category.toLowerCase().includes("weekend")) {
            swiper.innerHTML += `
                <div class="swiper-slide">
                    <img data-ticket-id="${ev.id}" class="swiperImg" src="${ev.posterURL}" alt="${ev.category}">
                </div>
            `;
        }
    });
    toOtherPage()
}
export function toOtherPage() {
    const swiperSlides = document.querySelectorAll(".swiper-slide");
    swiperSlides.forEach((slide) => {
        slide.addEventListener("click", function () {
            const eventID = this.querySelector('img').getAttribute("data-ticket-id");
            const newPageUrl = `buy.html?eventID=${eventID}`;
            window.location.href = newPageUrl;
        });
    });
}






