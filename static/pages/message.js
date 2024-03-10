let tabelFrom = new Table(["נשלח בתאריך","מאת","תאריכים","גוף ההודעה","פעולות"])
let tabelTo = new Table(["נשלח בתאריך","עבור","תאריכים","גוף ההודעה","נקרא","אושר"])


data.messages.reverse().forEach(msg=>{
    if(msg.from == data.user.id)
        tabelTo.addRow([msg.date,msg.toName,`מ-${msg.start} עד ${msg.end}`,msg.body,msg.isRead? "נקרא":"לא",msg.confirm])
    if(msg.to == data.user.id)
        tabelFrom.addRow([msg.date,msg.fromName,`מ-${msg.start} עד ${msg.end}`,msg.body, renderActionMessage(msg)])
})

document.title = "הודעות"
document.getElementById("root").innerHTML += /*html*/`
    ${Header()}
    <div id="Message">
        <div id="request" onclick="readAll()">
            <h1>נשלח אליי</h1>
            ${tabelFrom.getHtml()}
        </div>
        <div id="myRequest">
            <h1>ההודעות שלי</h1>
            ${tabelTo.getHtml()}
        </div>
    </div>
`


function renderActionMessage(msg){
    if(msg.confirm !="wait")  return msg.confirm 
    return /*html*/`
        <div>
            <button class="actionMessage_confirm" onclick="confirmMgs('${msg.id}','אושר')">אשר</button>
            <button class="actionMessage_confirm" onclick="confirmMgs('${msg.id}','סורב')">סרב</button>
        </div>
    `
}

function confirmMgs(msgId,isConfirm){
    POST("/confirmMgs",{id: msgId ,isConfirm:isConfirm},(resopnse)=>{
        if(resopnse.status == 200){
           Alert("הפעולה בוצעה בהצלחה","Good",1000, ()=> location.reload())
        }
    })
}

function readAll(){
    POST("readMgs",{id:data.user.id},(resopnse)=>{
        if(resopnse.status == 200){
            document.getElementById("numberOfMsg").innerHTML = 0
        }
    })
}