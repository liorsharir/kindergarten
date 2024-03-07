
document.title = "הודעות"
document.getElementById("root").innerHTML += /*html*/`
        ${Header()}

        <div id="from_request" onfocus="readAllMgs()">
            ${renderTableFromRequest()}
        </div>
        <div id="my_request">
            ${renderTableMyRequest()}
        </div>
    `



function renderTableMyRequest(){
    let message = data.messages.filter(m=>m.fromID = data.user.id)
    let tabel = new table(["נשלח בתאריך","עבור","תאריכים","גוף ההודעה","נקרא","אושר"])
    message.forEach(msg=>{
        tabel.addRow([
            msg.date,
            msg.toName,
            msg.freeDay,
            msg.body,
            msg.read,
            msg.confirm
        ])
    })


    return /*html*/`
        <h1>ההודעות שלי</h1>
        <div id="myRequest">
            ${tabel.getHtml()}
        </div>
    `
} 

function renderTableFromRequest(){
    let message = data.messages.filter(m=>m.toID = data.user.id)
    let tabel = new table(["נשלח בתאריך","מאת","תאריכים","גוף ההודעה","פעולות"])
    message.forEach(msg=>{
        tabel.addRow([
            msg.date,
            msg.fromName,
            msg.freeDay,
            msg.body,
            /*html*/`
                <div>
                    <button onclick = "confirmHandler('${mgs.id}')"></button>    
                    <button onclick = "unConfirmHandler('${mgs.id}')"></button>    
                <div>                
            `
        ])
    })
    return /*html*/`
        <h1>הודעות ובקשות</h1>
        <div id="fromRequest" onfocus="readAllMgs()">
            ${tabel.getHtml()}
        </div>
    `
} 








function readAllMgs(){

    if(!m.read){
        POST("/readMgs",{id:m.id},(response)=>{})
    }

}