let mon = new Month()
let message = getMessageForMonth()

function CalendarEvent(mon = new Month(), renderSelectTime=true){

    return /*html*/`
        <div id="eventsCalendarContainer">
            ${mon.allDate.map((m,i)=>{
        let temp = ""
        if(i==0 && mon.getDayNum(mon.first)>1)  for(let i=2;i<mon.getDayNum(mon.first);i++) temp+=`<div class="eventsMonItem"></div>`

        return /*html*/`
                    ${temp}
                    <div id="date-${m}" class="eventsMonItem" onclick="addEventForDay('${i}')">
                        <div class="eventTh">
                            <div class="eventTh_day">${mon.getDayString(m)}</div>
                            <div class="eventTh_date">${m}</div>
                        </div>
                        <div  id="dateContainer-${i}" class="eventDataContainer">
                            ${message[i]}
                        </div>
                    </div>
                `}).join('')}
        </div>

    `
}

function addEventForDay(day){
    if(document.getElementById(`dateContainer-${day}`).childNodes.length>1) return
    confirm(/*html*/`
        <h3 style="text-align:center;">${mon.allDate[day]}</h3><br>
        <label>כותרת:</label><br>
        <input type="text" id="title" /><br>
        <label>הודעה:</label><br>
        <textarea id="body" style="width:90%; heigth:height"></textarea>
    `,(answer)=>{
        if(answer){
            let title = document.getElementById("title").value
            let body = document.getElementById("body").value
            let i = day-1;
            if(i<0)
                i=0
            if(i==0)
                i=1
            let sendToServer={
                summery : title,
                body:body,
                start:  mon.allDate[i]+'T06:00:00',
                end:    mon.allDate[i]+'T20:00:00'
            }
            POST("/addEvents",sendToServer,()=>{
                Alert("האירוע נוצר בהצלחה","Good",1000,()=>location.reload())
            })
        }
    },"אשרי","בטלי")

}


function getMessageForMonth(){
    let message =  {"0":"","1":"","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":"","17":"","18":"","19":"","20":"","21":"","22":"","23":"","24":"","25":"","26":"","27":"","28":"","29":"","30":"","31":"",}
    if(data.events)
        data.events.forEach(e=>{
            if( mon.first.split("-")[1] == e.start.mon  ){
                let i = Number.parseInt(e.start.day)+1;
                if(e.start.day == "01")
                    i= 1
                if(e.start.day == "02")
                    i= 2
                message[i] = renderEventCalendar(e)
            }
            else{
                let date1 = new Date(mon.first);
                date1.setDate(date1.getDate()-1)
                let dateStr = date1.toISOString().split('T')[0]

                if(dateStr.split('-')[2] == e.start.day && dateStr.split('-')[1]  == e.start.mon)
                    message[0] = renderEventCalendar(e)
            }
        })
    return message
}


function renderEventCalendar(event){
    return /*html*/`
        <div class="EventDataNoCursor">
            <div class="deleteEvent" onclick="removeEvent('${event.id}')">X</div>
            <div class="EventData">
                <div class="summary">${event.summary}</div>
                <div class="description">${event.description}</div>    
            </div>
        </div>
       
    `
}


function removeEvent(id){
    POST("/deleteEvents",{id:id},(response)=>{
        if(response.status == 200){
            Alert("האירוע נמחק בהצלחה","Good",1000,()=>location.reload())
        }
    })
}


function selectDateHandler(){
    let btnSelectTime_V= document.getElementById("btnSelectTime_V")
    mon = new Month(new Date(btnSelectTime_V.value));
    let eventsCalendar = document.getElementById("eventsContainer")
    eventsCalendar.innerHTML = CalendarEvent(mon,false)
}

function add30(){
    mon.addMonth()
    message = getMessageForMonth()
    document.getElementById("eventsContainer").innerHTML =  CalendarEvent(mon,false)
    document.getElementById("btnSelectTime_V").value = mon.first;
}
function sub30(){
    mon.subMonth()
    message = getMessageForMonth()
    document.getElementById("eventsContainer").innerHTML = CalendarEvent(mon,false)
    document.getElementById("btnSelectTime_V").value = mon.first;
}
