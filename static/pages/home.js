let data = JSON.parse(document.getElementById("data").innerHTML)

document.title = "דף הבית"
document.getElementById("root").innerHTML = /*html*/`
    <link rel="stylesheet" type="text/css" href="static/css/home.css"/>
    ${Header(data)}   
    <div id="logoHome"><img src="static/img/logoHome.png" alt="logoHome"/></div>
    <h1>ברוכים הבאים לגן אלה</h1>
    ${AboutUs(data)}
`

