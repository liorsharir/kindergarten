if(location.pathname.indexOf("loginin")>=0){
    location.replace("login")
}

if(location.pathname.indexOf("login")>=0){
   let loginRoot = document.getElementById("loginRoot")
   loginRoot.style.display="block"
   loginRoot.style.width= "100%"
   document.getElementById("root").style.display="none"
   document.body.style.margin = "0px"
   document.body.style.width = "100%"
}
