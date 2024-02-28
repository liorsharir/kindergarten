function Alert(text , type="normal"){
    let alertDom = document.createElement("div");
    alertDom.style.display = "none"


    alertDom.innerHTML = /*html*/`
        <div class="alert_header"></div>        
        <div class="alert_context"></div>        
    `
    if(type="confirm"){
        alertDom.innerHTML += /*html*/`
        <div class="alert_action"></div>           
    `
    }


    function onClickOk(){}
    function onClickNoOk(){}



    document.body.append(alertDom)


}



function confirm(text){
    Alert(text , "confirm")
    
}