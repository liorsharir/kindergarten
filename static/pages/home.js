document.title = "דף הבית"
document.getElementById("root").innerHTML = /*html*/`
    ${Header()}   
    <div id="logoHome"><img src="static/img/logoHome.png" alt="logoHome"/></div>
    <h1>ברוכים הבאים לגן אלה</h1>
    ${AboutUs()}

    <div class="feature-list">
         ${FeaturePresentation("ניהול תיק אישי", "פרטים, תיעוד ומעקב אישי", "static/img/manageKid.png")}
         ${FeaturePresentation("שיבוץ משמרות","ניהול יומן ואילוצים לצוות הגן", "static/img/manageShifts.png")}
         ${FeaturePresentation("ניהול אירועי הגן", "פרטים, עריכה, הוספה ללוח שנה", "static/img/manageEvents.png")}  
    </div>
 
`


function FeaturePresentation(title, description, imagePath) {
    return /*html*/`
        <div class="feature-box">
            <img src="${imagePath}" alt="${title}"/>
            <h2>${title}</h2>
            <p>${description}</p>
        </div>
    `;
}
