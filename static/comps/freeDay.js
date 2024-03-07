function FreeDay(){

    return /*html*/`
        <div id="form_freeDay">
            <h1>טופס בקשת ימי חופש  ושליחת הודעות לגננת</h1>
            <label>עבור תאריך</label>  <input id="date_freeDayStart" type="date" />
            <label>עד תאריך</label>    <input id="date_freeDayEnd"   type="date" />
            <label>גוף ההודעה</label>  <input id="body_freeDay"      type="text" />
            <button onclick="sendFreeDayHandler()">שלח</button>
        </div>
    `
}



function sendFreeDayHandler(){}
