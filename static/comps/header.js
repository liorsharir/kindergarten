function Header(data){
    return /*html*/`
        <link rel="stylesheet" type="text/css" href="static/css/header.css"/>
        <header>
            <div id="account">
                <div id="avatar"><img src="${data.user.avatar}" alt="avatar"></div>
                <div id="name">
                    <div id="hello"> שלום ${data.user.firstName} !</div>
                    <div id="logout"><button onclick="logoutHandler()">logout</button></div>
                </div>
                <div id="notifications"><img src="static/img/notifications.png" alt="notifications"></div>
            </div>
            <ul id="menu">
                <li><a href="/home">דף הבית</a></li>
                <li><a href="/children">ילדים</a></li>
                <li><a href="/assistant">סייעות</a></li>
                <li><a href="">אירועים</a></li>
            </ul>
            <div id="logo"><img src="static/img/logo.png" alt="Ella's_Kindergarten_logo"/></div>
        </header>
    `
}




function logoutHandler(){
    POST("/loginout",{},({status})=>{
        if(status == 200){
            document.cookie =`token=; expires=;path=/`;
            location.replace("login")
        }
    })
}