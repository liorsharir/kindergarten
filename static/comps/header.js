function Header(){
    return /*html*/`
        <header class="header">
                <div class="header_avatar">
                    <div class="avatar_img"><img style="display:inline-block" src="${data.user.avatar}" alt="avatar"></div>
                    <div class="header_avatar_name">
                        <div id="hello"> שלום ${data.user.firstName} !</div>
                        <div id="logout"><button onclick="logoutHandler()">logout</button></div>
                    </div>
                    <div class="avatar_notifications_img"><img src="static/img/notifications.png" alt="notifications"></div>
                </div>
                <ul class="header_nav_1">
                    <li><a href="/home">דף הבית</a></li>
                    <li><a href="/children">ילדים</a></li>
                    ${render(data.user.auth =="ASSISTANCE",/*html*/`
                        <li><a href="/assistant">בקשות</a></li>
                    `)}
                    ${render(data.user.auth =="KINDERGARTNER",/*html*/`
                        <li><a href="/assistant">סייעות</a></li>
                    `)}
                    
                    <li><a href="">אירועים</a></li>
                </ul>

                <div class="header_nav_burger">????</div>
                <div class="header_nav_2">????</div>

                <div class="header_logo">
                    <img class="header_logo1" src="static/img/logo.png" alt="Ella's_Kindergarten_logo"/>
                    <img class="header_logo2" src="static/img/logo2.png" alt="Ella's_Kindergarten_logo"/>
                </div>
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



