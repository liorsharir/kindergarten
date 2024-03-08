let week = new Time()
let message = {
    "1":"הוסף עובד",
    "2":"הוסף עובד",
    "3":"הוסף עובד",
    "4":"הוסף עובד",
    "5":"הוסף עובד",
    "6":"הוסף עובד",
    "7":"הוסף עובד",
}
function CalendarAsistance(week = new Time()){
    return /*html*/`
        <div id="calendarAsistance">
            <div id="selectDate">
                <span>בחירת שבוע קלנדרי</span>   
                <div id="SelectTime">
                    <input class="btnSelectTime" id="btnSelectTime_V" value='${week.getCurrentWeekSunday()}' oninput="selectDateHandler()" type="date"/>
                    <span  id="btnSelectTime_date">${week.sunday} : ${week.saturday}</span>   
                    <button class="btnSelectTime" id="btnSelectTime_left"  onclick="sub7()" ><</button>
                    <button class="btnSelectTime" id="btnSelectTime_rigth" onclick="add7()" >></button>
                </div>
            </div>
            <div id="theCalendar">
                <div id="Calendar_row">
                    <div class="weekCalendar">
                        <span>יום ראשון</span>
                        <span>${week.getDayDate(1)}</span>
                    </div>
                    <div class="weekCalendar">
                        <span>יום שני</span>
                        <span>${week.getDayDate(2)}</span>
                    </div>
                    <div class="weekCalendar">
                        <span>יום שלישי</span>
                        <span>${week.getDayDate(3)}</span>
                    </div>
                    <div class="weekCalendar">
                        <span>יום רביעי</span>
                        <span>${week.getDayDate(4)}</span>
                    </div>
                    <div class="weekCalendar">
                        <span>יום חמישי</span>
                        <span>${week.getDayDate(5)}</span>
                    </div>
                    <div class="weekCalendar">
                        <span>יום שישי</span>
                        <span>${week.getDayDate(6)}</span>
                    </div>
                    <div class="weekCalendar saturday">
                        <span>יום שבת</span>
                        <span>${week.getDayDate(7)}</span>
                    </div>
                </div>
                <div id="Calendar_col">
                    <div id="dayCalendar-1" onclick="addAsistantForDay(1)" class="dayCalendar">${message["1"]}</div>
                    <div id="dayCalendar-2" onclick="addAsistantForDay(2)" class="dayCalendar">${message["2"]}</div>
                    <div id="dayCalendar-3" onclick="addAsistantForDay(3)" class="dayCalendar">${message["3"]}</div>
                    <div id="dayCalendar-4" onclick="addAsistantForDay(4)" class="dayCalendar">${message["4"]}</div>
                    <div id="dayCalendar-5" onclick="addAsistantForDay(5)" class="dayCalendar">${message["5"]}</div>
                    <div id="dayCalendar-6" onclick="addAsistantForDay(6)" class="dayCalendar">${message["6"]}</div>
                    <div id="dayCalendar-7"  class="dayCalendar saturday"></div>
                </div>
            </div>
        </div>
    `
}



function selectDateHandler(){
    let btnSelectTime_V= document.getElementById("btnSelectTime_V")
    week = new Time(new Date(btnSelectTime_V.value));
    let CalendarAsistanceContainer = document.getElementById("CalendarAsistanceContainer")
    CalendarAsistanceContainer.innerHTML = CalendarAsistance(week)
}

function add7(){
    week.addWeekToDate()
    document.getElementById("CalendarAsistanceContainer").innerHTML = CalendarAsistance(week)
    document.getElementById("btnSelectTime_V").value = week.currentDate;
}
function sub7(){
    week.subWeekToDate()
    document.getElementById("CalendarAsistanceContainer").innerHTML = CalendarAsistance(week)
    document.getElementById("btnSelectTime_V").value = week.currentDate;
}


function addAsistantForDay(day){
    let elem = document.getElementById(`dayCalendar-${day}`);
    confirm(/*html*/`
        <h3 style="text-align:center;" >${week.getDayDate(day)}</h3><br>
        <label>בחרי סייעת לשיבוץ:</label>
        <select id="assistantSelected"> ${data.assistants.map(a=>`<option style="text-align:center;" value="${a.id}">${a.name}</option>`)} </select><br><br>
        <label>הודעה:</label><br>
        <textarea id="body" style="width:90%; heigth:height"></textarea>
    `,(answer)=>{
        if(answer){
            let assistantSelected = document.getElementById("assistantSelected").value
            let body = document.getElementById("body").innerHTML
            POST("/addAssistantsEvents",{assistants:assistantSelected,body:body,date:week.getDayDate(day)},(response)=>{
                
            })
        }
    },"אשרי","בטלי")

}


function getMessageForWeek(){
    message = {
        "1":"הוסף עובד",
        "2":"הוסף עובד",
        "3":"הוסף עובד",
        "4":"הוסף עובד",
        "5":"הוסף עובד",
        "6":"הוסף עובד",
        "7":"הוסף עובד",
    }

    // data.messages.forEach(m=>{})

}

function getDatNumByDate(date){

}