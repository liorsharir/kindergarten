document.title = "דף הבית"
document.getElementById("root").innerHTML = /*html*/`
    ${Header()}   
    <div id="logoHome"><img src="static/img/logoHome.png" alt="logoHome"/></div>
    <h1>ברוכים הבאים לגן ״אלה״</h1>
    ${AboutUs()}

    <div class="feature-list">
        <li><a href="/children">${FeaturePresentation("ניהול תיק אישי", "פרטים, תיעוד ומעקב אישי", "static/img/manageKid.png")}</a></li>
        <li><a href="/assistant">${FeaturePresentation("שיבוץ משמרות", "ניהול יומן ואילוצים לצוות הגן", "static/img/manageShifts.png")}</a><li>
        <li><a href="/events">${FeaturePresentation("ניהול אירועי הגן", "פרטים, עריכה, הוספה ללוח שנה", "static/img/manageEvents.png")}</a></li>
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
