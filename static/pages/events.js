document.title = "אירועים"
document.getElementById("root").innerHTML = /*html*/`
    ${Header()}   
    <h1>אירועים</h1>
    <div id="Select_Time" class="SelectTime_Events">
            <input class="btnSelectTime" id="btnSelectTime_V" value='${mon.first}' oninput="selectDateHandler()" type="date"/>
            <span  id="btnSelectTime_date">${mon.first} : ${mon.last}</span>   
            <button class="btnSelectTime" id="btnSelectTime_left"  onclick="sub30()" ><</button>
            <button class="btnSelectTime" id="btnSelectTime_rigth" onclick="add30()" >></button>
    </div>
    <div id="eventsContainer">
        ${CalendarEvent()}
    </div>  
`




