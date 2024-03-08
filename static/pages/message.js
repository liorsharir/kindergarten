let tabelFrom = new Table(["נשלח בתאריך","מאת","תאריכים","גוף ההודעה","פעולות"])
let tabelTo = new Table(["נשלח בתאריך","עבור","תאריכים","גוף ההודעה","נקרא","אושר"])

// tabelTo.addRow(["a1","b1","c1","d1","e1","i1"])
// tabelTo.addRow(["a2","b2","c2","d2","e2","i2"])
// tabelTo.addRow(["a2","b2","c2","d2","e2","i2"])
// tabelTo.addRow(["a2","b2","c2","d2","e2","i2"])


data.messages.forEach(msg=>{
    if(msg.from == data.user.id)
        tabelFrom.addRow([msg.date,msg.fromName,msg.freeDay,msg.body,""])
    if(msg.to == data.user.id)
        tabelTo.addRow(["a","b","c","d","e","i"])
})

document.title = "הודעות"
document.getElementById("root").innerHTML += /*html*/`
    ${Header()}

    <div id="Message">

        <div id="request">
            <h1>נשלח אליי</h1>
            ${tabelFrom.getHtml()}
        </div>

        
        <div id="myRequest">
            <h1>ההודעות שלי</h1>
            ${tabelTo.getHtml()}
        </div>



    </div>
`
