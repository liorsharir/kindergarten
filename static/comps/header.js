function Header(){
    return /*html*/`
        <header class="header">
                <div class="header_avatar">
                    <div class="avatar_img" onclick="{location.replace('/message')}"><img style="display:inline-block" src="${data.user.avatar}" alt="avatar"></div>
                    <div class="header_avatar_name">
                        <div id="hello"  onclick="{location.replace('/message')}"> שלום ${data.user.firstName} !</div>
                        <div id="logout"><button onclick="logoutHandler()">logout</button></div>
                    </div>
                    <div class="avatar_notifications_img" onclick="{location.replace('/message')}">
                        <div id="numberOfMsg">${GetNumberOfMgsNotRead()}</div>
                        <img src="static/img/notifications.png" alt="notifications">
                    </div>
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
                    
                    <li><a href="/events">אירועים</a></li>
                </ul>

                <div class="header_nav_burger" onclick="burgerHandler()">תפריט</div>
                <div class="header_nav_2">????</div>

                <div class="header_logo" style="cursor:pointer;" onclick="{location.replace('/home')}">
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





function GetNumberOfMgsNotRead(){
    result = 0;
    data.messages.forEach((m,i)=>{
        if(m.to == data.user.id)
            if(m.read=="0")
                result++
    })
    return result
}


function burgerHandler(){
    popup("",()=>{
        return /*html*/`        
            <ul class="burger_nav">
                <li><a href="/home">דף הבית</a></li>
                <li><a href="/children">ילדים</a></li>
                ${render(data.user.auth =="ASSISTANCE",/*html*/`
                    <li><a href="/assistant">בקשות</a></li>
                `)}
                ${render(data.user.auth =="KINDERGARTNER",/*html*/`
                    <li><a href="/assistant">סייעות</a></li>
                `)}
                
                <li><a href="/events">אירועים</a></li>
            </ul>
        `
    })
}

