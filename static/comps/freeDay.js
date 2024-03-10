function FreeDay(){

    return /*html*/`
        <div id="form_freeDay">
            <h1>טופס בקשת ימי חופש  ושליחת הודעות לגננת</h1>
            <label>עבור תאריך</label>  <input id="date_freeDayStart" type="date" />
            <label>עד תאריך</label>    <input id="date_freeDayEnd"   type="date" />
            <label>גוף ההודעה</label>  <textarea id="body_freeDay"></textarea>
            <button onclick="sendFreeDayHandler()">שלח</button>
        </div>
    `
}



function sendFreeDayHandler(){
    let sendToServer={
        toID:data.KINDERGARTNERID,
        fromID: data.user.id,
        start : document.getElementById("date_freeDayStart").value,
        end : document.getElementById("date_freeDayEnd").value,
        body :document.getElementById("body_freeDay").value,
    }
    console.log(sendToServer)
    POST("/sendMessage",sendToServer,(response)=>{
        if(response.status==200){
            Alert("ההודעה משלחה בהצלחה","Good",100,()=>location.reload())
        }
    })
}
