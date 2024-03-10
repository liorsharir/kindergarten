let week = new Week()

let message = getMessageForWeek()
function CalendarAsistance(week = new Week()){
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
    week = new Week(new Date(btnSelectTime_V.value));
    let CalendarAsistanceContainer = document.getElementById("CalendarAsistanceContainer")
    CalendarAsistanceContainer.innerHTML = CalendarAsistance(week)
}

function add7(){
    week.addWeekToDate()
    document.getElementById("CalendarAsistanceContainer").innerHTML = CalendarAsistance(week)
    document.getElementById("btnSelectTime_V").value = week.currentDate;
    message = getMessageForWeek()
}
function sub7(){
    week.subWeekToDate()
    document.getElementById("CalendarAsistanceContainer").innerHTML = CalendarAsistance(week)
    document.getElementById("btnSelectTime_V").value = week.currentDate;
    message = getMessageForWeek()
}


function addAsistantForDay(day){
    let elem = document.getElementById(`dayCalendar-${day}`);
    if(elem.childNodes.length>1) return
    confirm(/*html*/`
        <h3 style="text-align:center;" >${week.getDayDate(day)}</h3><br>
        <label>בחרי סייעת לשיבוץ:</label>
        <select id="assistantSelected"> ${data.assistants.map(a=>`<option style="text-align:center;" value="${a.id}">${a.name}</option>`)} </select><br><br>
        <label>הודעה:</label><br>
        <textarea id="body" style="width:90%; heigth:height"></textarea>
    `,(answer)=>{
        if(answer){
            let assistant = document.getElementById("assistantSelected").value
            let body = document.getElementById("body").value +"|"+data.assistants.find(a=>a.id==assistant).name
            let sendToServer={
                toID:assistant,
                fromID: data.user.id,
                assistant : assistant,
                summery : "שיבוץ עובד",
                body:body,
                start:week.getDayDateFormat(day)+'T06:00:00',      
                end:week.getDayDateFormat(day)+'T20:00:00'           
            }
            console.log("sendToserver",sendToServer)
            POST("/addAssistantsEvents",sendToServer,()=>{
                Alert("השיבוץ נוצר בהצלחה","Good",1000,()=>location.reload())
            })
        }
    },"אשרי","בטלי")

}


function getMessageForWeek(){
    let message = {
        "1":"&nbsp;&nbsp;הוסף עובד",
        "2":"&nbsp;&nbsp;הוסף עובד",
        "3":"&nbsp;&nbsp;הוסף עובד",
        "4":"&nbsp;&nbsp;הוסף עובד",
        "5":"&nbsp;&nbsp;הוסף עובד",
        "6":"&nbsp;&nbsp;הוסף עובד",
        "7":"&nbsp;&nbsp;הוסף עובד",
    }
    
    if(data.events)
        data.events.forEach(e=>{
            let daynum =  new Date(e.start.fullYear).getDay()+1 
            message[daynum] = renderCalendar( e.description , e.id)
        })
    return message
}



function renderCalendar(description,id){
    let body = description.split("|")[0]
    let assistant = description.split("|")[1]
    return /*html*/`
        <div class="calendarItem">
            <div class="calendarItemExit" onclick="deleteCalandarItem('${id}')">X</div>
            <div class="calendarBody">${body}</div>
            <div class="calendarAsistant">סייעת : ${assistant}</div>
        </div>
    `
}

function deleteCalandarItem(id){
    POST("/deleteAssistantsEvents",{id:id},(response)=>{
        if(response.status == 200){
            Alert("השיבוץ נמחק בהצלחה","Good",1000,()=>location.reload())
        }
    })
}