let colors = ["red","yellow","green","pink"]
function CalendarAsistance(){

    return /*html*/`
       <div class = "calendarAssistant">
            <h1>יומן שיבוץ</h1>
            <div class="selectDate">
                <label>משבוע</label>   <input type="date" id="selectStartDate" value="${Time.getFirstDayOfWeek()}" />
                <button id="clickDate" onclick="clickDateHandler()">בחר</button>
            </div>

            <div style="position:relative;">
                <div id='clanderBorder'>${rendeCalendarBorder()}</div>
                <div id="mainCalendar" style="z-index:999"></div>

                <div id="addEvent">
                    <h2>צרי אירוע:</h2><br>
                    <label>תאריך</label>   <input type="date" id="dateOfEvent" value="" />
                    <label>משעה</label>   
                    <select id="startHourOfEvent">
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                    </select>
                    <label>עד שעה</label>   
                    <select id="endHourOfEvent">
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                    </select>
                    <label>הודעה</label>   <input type="text" id="bodyOfEvent" value="" />
                    <label>שיבוץ</label>   <select  id="assistantOfEvent">${data.assistants.map(ass=>`<option value="${ass.id}">${ass.name}</option>`)} </select>
                    <button onclick="createEventHandler()" >צור</button>
                </div>
            </div>
       </div> 
       ${setTimeout(()=>{
            rendercalendar(Time.getFirstDayOfWeek(),Time.getLastDayOfWeek())
       },400)}
    `
}


function clickDateHandler(){
    let theCalendar = document.getElementById("mainCalendar")
    let start = document.getElementById("selectStartDate").value
    theCalendar.innerHTML = ""
    rendercalendar(Time.getFirstDayOfWeek(start),Time.getLastDayOfWeek(start)) 
}



function rendercalendar(start,end){
    events = data.events.filter(e=>{console.log([start,end,e.start.fullYear,Time.areDatesInSameWeek(start,end,e.start.fullYear)]);return Time.areDatesInSameWeek(start,end,e.start.fullYear)})
    let days={
        "0" : DOMElement.create("div",{id:"day0",className:"calendarDay",dadId:"mainCalendar"}),
        "1" : DOMElement.create("div",{id:"day1",className:"calendarDay",dadId:"mainCalendar"}),
        "2" : DOMElement.create("div",{id:"day2",className:"calendarDay",dadId:"mainCalendar"}),
        "3" : DOMElement.create("div",{id:"day3",className:"calendarDay",dadId:"mainCalendar"}),
        "4" : DOMElement.create("div",{id:"day4",className:"calendarDay",dadId:"mainCalendar"}),
        "5" : DOMElement.create("div",{id:"day5",className:"calendarDay",dadId:"mainCalendar"}),
        "6" : DOMElement.create("div",{id:"day6",className:"calendarDay",dadId:"mainCalendar"}),
    }


    days["0"].innerHTML =/*html*/`
        <div class="calendarRow calendarHeader">שעות</div>
        <div class="calendarRow calendarHeader">7:00</div>
        <div class="calendarRow calendarHeader">7:30</div>
        <div class="calendarRow calendarHeader">8:00</div>
        <div class="calendarRow calendarHeader">8:30</div>
        <div class="calendarRow calendarHeader">9:00</div>
        <div class="calendarRow calendarHeader">9:30</div>
        <div class="calendarRow calendarHeader">10:00</div>
        <div class="calendarRow calendarHeader">10:30</div>
        <div class="calendarRow calendarHeader">11:00</div>
        <div class="calendarRow calendarHeader">11:30</div>
        <div class="calendarRow calendarHeader">12:00</div>
        <div class="calendarRow calendarHeader">12:30</div>
        <div class="calendarRow calendarHeader">13:00</div>
        <div class="calendarRow calendarHeader">13:30</div>
        <div class="calendarRow calendarHeader">14:00</div>
        <div class="calendarRow calendarHeader">14:30</div>
        <div class="calendarRow calendarHeader">15:00</div>
        <div class="calendarRow calendarHeader">15:30</div>
        <div class="calendarRow calendarHeader">16:00</div>
    `;

    for(let i=1;i<7;i++){
        days[`${i}`].innerHTML+=`<div class="calendarHeader" style="grid-row:1/2;">${Time.dayNumToString(i,Time.addDaysToDate(start,(i-1)))}</div>`;
    }

    events.forEach((e,i)=>{
        let elem = document.createElement("div")
        elem.style.gridRow = `${Number(e.start.hour)-5}/${Number(e.end.hour)-5}`
        elem.style.backgroundColor = colors[i%(colors.length-1)]
        elem.style.zIndex = 500
        elem.style.width = "95%"
        elem.style.height = "99%"
        elem.style.margin = "auto"

        let id=  e.id.toString()

        elem.innerHTML=/*html*/`
            <button onclick= "removeEventHandler('${id}')" >X</button>
            <h5>${e.start.fullHour} - ${e.end.fullHour} </h5>
            <div>${e.description.replace("&lt;","<").replace("&gt;",">")}</div>
        `


        let dayNum =  Time.getDayNumber(e.start.fullYear)
        console.log("dayNum",dayNum)
        let index;
        if(dayNum == 7) index = 1
        else if(dayNum == 6) index = 6
        else index = dayNum +1
        console.log("index",index)
        days[index].appendChild(elem)
    })


}


function rendeCalendarBorder(){
    result="";
    for(let i=0;i<7;i++){
        result+=`<div id="dayTemp${i}" class='calendarBorderDay'>`;
        for(let i=0 ; i<20;i++) result+=`<div class="calendarBorderRow"></div>`;
        result+="</div>";
    }
    return result
}



function createEventHandler(){
    let ArrIDs = ["endHourOfEvent","startHourOfEvent","bodyOfEvent","assistantOfEvent","dateOfEvent"]
    let resultValidation = validation("assistantEvent",ArrIDs) 
    if(resultValidation){
        POST(`/addAssistantsEvents`,resultValidation,(respone)=>{
            if(respone.status == 200){
                location.reload()
            }
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}

function removeEventHandler(id){
    let answer = confirm("האם את בטוחה שכדאי למחוק את השיבוץ :_(")
    if(answer){
        POST("/deleteAssistantsEvents",{id: id} ,(respone)=>{
            if(respone.status == 200)
                location.reload()
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}