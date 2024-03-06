function PopUp(header, context,call){
    let div = document.createElement("div")
    div.id = "idPopUp"+Math.round(Math.random()*99999)
    div.className = "popUpLib"

    // div.style.width = "500px"
    // div.style.height = "500px"
    // div.style.position = "fixed"
    // div.style.display = "flex"
    // div.style.top = "100px"
    // div.style.flexDirection = "column"
    // div.style.alignItems = "center"
    // div.style.backgroundColor = "white"
    // div.style.borderRadius = "20px"
    // div.style.zIndex = "909"


    let h1 = document.createElement("h1");
    h1.className="popUpLib-h1"
    h1.innerHTML = header
    // h1.style.textAlign = "center"
    // h1.style.height = "50px"
    // h1.style.marginBottom = "20px"

    let ctx = document.createElement("div")
    ctx.innerHTML = context
    ctx.style.height = "max-content"


    let _exit =  document.createElement("div");
    _exit.className = "popUpLib-exit"

    _exit.innerHTML = "X"
    // _exit.style.display="flex"
    // _exit.style.justifyContent="center"
    // _exit.style.alignItems="center"
    // _exit.style.height = "35px"
    // _exit.style.zIndex = "999"
    // _exit.style.borderRadius = "20px"
    // _exit.style.width = "90%"
    // _exit.style.margin = "16px auto"
    // _exit.style.backgroundColor = "red"
    // _exit.style.cursor = "pointer";

    _exit.onclick = ()=>{
       div.style.display ="none"
    }

    let Container = document.createElement("div")
    Container.style.width = "100%"
    Container.innerHTML+=call()

    div.appendChild(_exit)
    div.appendChild(h1)
    div.appendChild(ctx)
    div.appendChild(Container)
 


    document.body.appendChild(div) 
}




function Alert(context,type="Good",call){
    let div = document.createElement("div")
    div.className = "AlertLib"
    // div.style.width = "200px"
    // div.style.height = "300px"
    // div.style.position = "fixed"
    // div.style.display = "flex"
    // div.style.top = "200px"
    // div.style.flexDirection = "column"
    // div.style.justifyContent = "center"
    // div.style.alignItems = "center"
    // div.style.backgroundColor = "white"


    let img = document.createElement("img")
    img.className="AlertLib-img"
    img.src = `static/img/alert${type}.png`
    // img.style.width = "100px"
    // img.style.height = "100px"

    let ctx = document.createElement("div")
    ctx.style.height = "min-content"
    ctx.innerHTML = context


    div.appendChild(img)
    div.appendChild(ctx)
    document.body.appendChild(div)

    setTimeout(()=>{
        div.style.display = "none"
        call()
    },2000)
}



function confirm(context,confirmActionCall){
    let div = document.createElement("div")
    div.className = "confirmLib"
    // div.style.width = "300px"
    // div.style.height = "200px"
    // div.style.position = "fixed"
    // div.style.display = "flex"
    // div.style.top = "200px"
    // div.style.flexDirection = "column"
    // div.style.justifyContent = "center"
    // div.style.alignItems = "center"
    // div.style.backgroundColor = "white"

    
    let ctx = document.createElement("div")
    ctx.style.marginTop ="20px"
    ctx.style.display ="flex"
    ctx.style.justifyContent="center"


    ctx.innerHTML = context


    let confirmAction = document.createElement("div")
    confirmAction.style.direction = "flex"
    confirmAction.style.justifyContent = "space-between"
    confirmAction.style.gap = "20px"

    let buttonTrue =  document.createElement("button")
    let buttonFalse =  document.createElement("button")
    buttonTrue.className = "confirmLib-btn-true"
    buttonFalse.className = "confirmLib-btn-false"
    buttonTrue .innerHTML ="אשר"
    buttonFalse.innerHTML ="בטל"

    // buttonTrue.style.width="50px"
    // buttonTrue.style.height="50px"
    // buttonTrue.style.borderRadius ="20px"
    // buttonTrue.style.backgroundColor ="green"
    // buttonTrue.style.cursor ="pointer"

    // buttonFalse.style.width="50px"
    // buttonFalse.style.height="50px"
    // buttonFalse.style.borderRadius ="20px"
    // buttonFalse.style.backgroundColor ="red"
    // buttonFalse.style.cursor ="pointer"



    buttonTrue.onclick = ()=>{
        confirmActionCall(true)
    } 
    buttonFalse.onclick = ()=>{
        confirmActionCall(false)
        div.style.display = "none"
    }
   
    confirmAction.appendChild(buttonTrue)
    confirmAction.appendChild(buttonFalse)
    div.appendChild(ctx)
    div.appendChild(confirmAction)
    document.body.appendChild(div)
}



function exitPopUp(id){
    let popup = document.getElementById(id)
    popup.style.display = "none"
}
