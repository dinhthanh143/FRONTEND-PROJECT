let modal = document.querySelector(".fixAddModal")
let close = document.querySelector(".fa-xmark")
let cancel = document.querySelector(".cancel")
let open = document.querySelector(".open")
open.onclick = function(){
    modal.style.display = "flex"
}
close.onclick = function(){
    modal.classList.add("modalHide")
    modal.addEventListener("animationend",function handler(){
        modal.style.display = "none"
        modal.classList.remove("modalHide")
        modal.removeEventListener("animationend", handler)
    })
}
cancel.onclick = function(){
    modal.classList.add("modalHide")
    modal.addEventListener("animationend",function handler(){
        modal.style.display = "none"
        modal.classList.remove("modalHide")
        modal.removeEventListener("animationend", handler)

    })
}