function EditChildren(assistant){
    return /*html*/`
        <link rel="stylesheet" type="text/css" href="static/css/addAssistant.css"/>
        <div id="AddAssistant">
            <div id="exit" onclick="ExitAddAssistant()">X</div>
            <div id="formAssistants">
                <div id="formAssistant_data">
                    <!-- <label for="">ת"ז</label><br/>
                    <input id="childId" type="text" value="${child.id}"> 
                    <br/>
                    <label id="firstName" for="">שם פרטי</label><br/>
                    <input type="text" value="${child.firstName}"> 
                    <br/>
                    <label for="">שם משפחה</label><br/>
                    <input id="lastName" type="text" value="${child.lastName}"> 
                    <br/>
                    <label for="">תאריך לידה</label><br/>
                    <input id="birthday" type="date" value="${child.birthday}"> <br/> -->
                </div>
                <div id="assistantImg"></div>
            </div>
        
            <div id="assistant-action">
                <div id="deleteAssistant" onclick="deleteAssistantHandler()">מחק</div>
                <div id="saveAssistant"   onclick="updateAssistantHandler()">שמור</div>
            </div>
        </div>
    `
}

function ExitAddAssistant(){
    let addChildrenActions              = document.getElementById("addChildrenActions")
    let childernList                    = document.getElementById("childern-list")

    addChildrenActions.style.width      = "0%"
    childernList.style.width            = "100%"
    addChildrenActions.style.display    = "none"
    addChildrenActions.innerHTML        = ""
}

function updateAssistantHandler(){
    let sendObject = {
        assistantId     : document.getElementById("childId"),
        firstName       : document.getElementById("firstName"),
        lastName        : document.getElementById("lastName"),
        birthday        : document.getElementById("birthday"),
        assistantImg    : document.getElementById("assistantImg")
    };
    if(validation("children",sendObject))
        POST("/updateAssistant",{
            assistantId     : document.getElementById("childId").value,
            firstName       : document.getElementById("firstName").value,
            lastName        : document.getElementById("lastName").value,
            birthday        : document.getElementById("birthday").value,
            assistantImg    : document.getElementById("assistantImg").innerHTML
        },({status})=>{
            if(status == 200)
                location.reload()
            else
                alert("אין לך הרשאה לפעולה זו")
        })
        
}

function deleteAssistantHandler(){
    let answer = confirm("האם את בטוחה שכדאי למחוק את הילד :_(")
    if(answer){
        POST("/removeAssistant",{childId: document.getElementById("childId").value} ,({status})=>{
            if(status == 200)
                location.reload()
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}








