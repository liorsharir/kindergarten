// function PopUp(header, context,call){
//     let div = document.createElement("div")
//     div.id = "idPopUp"+Math.round(Math.random()*99999)
//     div.className = "popUpLib"

//     let h1 = document.createElement("h1");
//     h1.className="popUpLib-h1"
//     h1.innerHTML = header
  
//     let ctx = document.createElement("div")
//     ctx.innerHTML = context
//     ctx.style.height = "max-content"


//     let _exit =  document.createElement("div");
//     _exit.className = "popUpLib-exit"

//     _exit.innerHTML = "X"
   
//     _exit.onclick = ()=>{
//        div.remove()
//     }

//     let Container = document.createElement("div")
//     Container.style.width = "100%"
//     Container.innerHTML+=call()

//     div.appendChild(_exit)
//     div.appendChild(h1)
//     div.appendChild(ctx)
//     div.appendChild(Container)
//     document.body.appendChild(div) 
// }


function Alert(context,type="Good",ms=2000,call){
    let div = document.createElement("div")
    div.className = "AlertLib"
    let img = document.createElement("img")
    img.className="AlertLib-img"
    img.src = `static/img/alert${type}.png`


    let ctx = document.createElement("div")
    ctx.style.height = "min-content"
    ctx.innerHTML = context


    div.appendChild(img)
    div.appendChild(ctx)
    document.body.appendChild(div)

    setTimeout(()=>{
        div.style.display = "none"
        if(call)
            call()
    },ms)
}



function confirm(context,confirmActionCall,True="מחיקה",False="ביטול"){
    let container = document.createElement("div")
    container.className = "confirmLib"
    let div = document.createElement("div")
    div.className = "confirm-content"
    let ctx = document.createElement("h3")
    ctx.innerHTML = context
    let confirmAction = document.createElement("div")
    confirmAction.className = "button-container"
    let close = document.createElement("span")
    close.className = "close"
    close.innerHTML = "&times;"
    close.onclick = ()=>{
        container.remove()
    }
    let buttonTrue =  document.createElement("button")
    let buttonFalse =  document.createElement("button")
    buttonTrue.className = "delete-button"
    buttonFalse.className = "cancel-button"
    buttonTrue .innerHTML =True
    buttonFalse.innerHTML =False


    buttonTrue.onclick = ()=>{
        if(confirmActionCall)
            confirmActionCall(true)
        container.remove()
    } 
    buttonFalse.onclick = ()=>{
        if(confirmActionCall)
            confirmActionCall(false)
        container.remove()
    }
   
    confirmAction.appendChild(buttonFalse)
    confirmAction.appendChild(buttonTrue)

    container.appendChild(div)
    div.appendChild(close)
    div.appendChild(ctx)
    div.appendChild(confirmAction)
    document.body.appendChild(container)
}



function popup(context,call){
    let container = document.createElement("div")
    container.className = "confirmLib"
    let div = document.createElement("div")
    div.className = "confirm-content"

    let ctx = document.createElement("h3")


    ctx.innerHTML = context
    if(call)
        ctx.innerHTML = call()


    let close = document.createElement("span")
    close.className = "close"
    close.innerHTML = "&times;"
    close.onclick = ()=>{
        container.remove()
    }



    container.appendChild(div)
    div.appendChild(close)
    div.appendChild(ctx)
    document.body.appendChild(container)
}


function exitPopUp(id){
    let popup = document.getElementById(id)
    popup.remove()
}
