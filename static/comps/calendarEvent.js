let mon = new Month()
let message = getMessageForMonth()

function CalendarEvent(mon = new Month()){

    return /*html*/`
        <h1>אירועים</h1>
        <div id="SelectTime" class="SelectTimeEvents">
            <input class="btnSelectTime" id="btnSelectTime_V" value='${mon.first}' oninput="selectDateHandler()" type="date"/>
            <span  id="btnSelectTime_date">${mon.first} : ${mon.last}</span>   
            <button class="btnSelectTime" id="btnSelectTime_left"  onclick="sub30()" ><</button>
            <button class="btnSelectTime" id="btnSelectTime_rigth" onclick="add30()" >></button>
        </div>
        <div id="eventsCalendar">
            ${mon.allDate.map((m)=>{
                return /*html*/`
                    <div id="date${m}" class="eventsMonItem" onclick="">
                        <div class="eventTh">${m}</div>
                    </div>
                `}).join('')}
        </div>

    `
}


function getMessageForMonth(){
    let message =  {"1":"","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":"","17":"","18":"","19":"","20":"","21":"","22":"","23":"","24":"","25":"","26":"","27":"","28":"","29":"","30":"","31":"",}
    return message
}




function selectDateHandler(){
    let btnSelectTime_V= document.getElementById("btnSelectTime_V")
    mon = new Month(new Date(btnSelectTime_V.value));
    let eventsCalendar = document.getElementById("eventsCalendar")
    eventsCalendar.innerHTML = CalendarEvent(mon)
}

function add30(){
    mon.addMonth()
    document.getElementById("eventsContainer").innerHTML =  CalendarEvent(mon)
    document.getElementById("btnSelectTime_V").value = mon.first;
    message = getMessageForMonth()
}
function sub30(){
    mon.subMonth()
    document.getElementById("eventsContainer").innerHTML = CalendarEvent(mon)
    document.getElementById("btnSelectTime_V").value = mon.first;
    message = getMessageForMonth()
}
