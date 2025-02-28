const buyTicket = document.querySelectorAll(".buyTicket")
buyTicket.forEach((buyBtn)=>{
    buyBtn.addEventListener("click", ()=>{
        window.location.href = "./buy.html"
    })
})