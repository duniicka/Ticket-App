export function hover() {
    let ticketTypes = document.querySelectorAll(".ticket-type");

    ticketTypes.forEach(ticketType => {
        ticketType.addEventListener("mouseleave", () => {
            ticketType.classList.add("after-hover");
        });

        ticketType.addEventListener("mouseover", () => {
            ticketType.classList.remove("after-hover");
        });
    });
}
