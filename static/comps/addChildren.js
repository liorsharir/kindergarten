function AddChildren(){
    return /*html*/`
        <link rel="stylesheet" type="text/css" href="static/css/addChildren.css"/>
        <div id="AddChildren">
            <div id="exit" onclick="ExitAddChildren()">X</div>
            <div id="formChid">
                <div id="formChid_data">
                    <label for="">ת"ז</label><br/>
                    <input id="childId" type="text" value="">
                    <br/>
                    <label for="">שם פרטי</label><br/>
                    <input id="firstName" type="text" value=""> 
                    <br/>
                    <label for="">שם משפחה</label><br/>
                    <input id="lastName" type="text" value=""> 
                    <br/>
                    <label for="">תאריך לידה</label><br/>
                    <input id="birthday" type="date" value=""> <br/>
                </div>
                <div id="childImg"></div>
            </div>
            <div id="formDad">
                <table>
                    <tr>
                        <th>שם אב:</th>
                        <th>מספר טלפון</th>
                        <th>כתובת מייל:</th>
                    </tr>
                    <tr>
                        <td><input id="name_dad" type="text" value=""/></td>
                        <td><input id="phone_dad" type="text" value=""/></td>
                        <td><input id="mail_dad" type="text" value=""/></td>
                    </tr>
                </table>
            </div>
            <div id="formMom">
                <table>
                    <tr>
                        <th>שם אם:</th>
                        <th>מספר טלפון</th>
                        <th>כתובת מייל:</th>
                    </tr>
                    <tr>
                        <td><input id="name_mom"  type="text" value=""/></td>
                        <td><input id="phone_mom" type="text" value=""/></td>
                        <td><input id="mail_mom"  type="text" value=""/></td>
                    </tr>
                </table>
            </div>
            <div id="MedicalInformation">
                <label for="">מידע רפואי</label><br/>
                <textarea id="MedicalData"></textarea>
            </div>
            <div id="child-action">
                <div id="saveChild" onclick="addChildrenHandler()">הוסף</div>
            </div>
        </div>
    `
}

function ExitAddChildren(){
    let addChildrenActions = document.getElementById("addChildrenActions")
    let childernList = document.getElementById("childern-list")
    addChildrenActions.style.width = "0%"
    childernList.style.width = "100%"
    addChildrenActions.style.display = "none"
    addChildrenActions.innerHTML = ""
}
 
function addChildrenHandler(){
    let sendObject = {
        childId     : document.getElementById("childId"),
        firstName   : document.getElementById("firstName"),
        lastName    : document.getElementById("lastName"),
        birthday    : document.getElementById("birthday"),
        name_dad    : document.getElementById("name_dad"),
        phone_dad   : document.getElementById("phone_dad"),
        mail_dad    : document.getElementById("mail_dad"),
        name_mom    : document.getElementById("name_mom"),
        phone_mom   : document.getElementById("phone_mom"),
        mail_mom    : document.getElementById("mail_mom"),
        MedicalData : document.getElementById("MedicalData"),
        childImg    : document.getElementById("childImg")
    };
    if(validation("addChildren",sendObject)){
        POST("/addChildren",{
            childId     : document.getElementById("childId").value,
            firstName   : document.getElementById("firstName").value,
            lastName    : document.getElementById("lastName").value,
            birthday    : document.getElementById("birthday").value,
            name_dad    : document.getElementById("name_dad").value,
            phone_dad   : document.getElementById("phone_dad").value,
            mail_dad    : document.getElementById("mail_dad").value,
            name_mom    : document.getElementById("name_mom").value,
            phone_mom   : document.getElementById("phone_mom").value,
            mail_mom    : document.getElementById("mail_mom").value,
            MedicalData : document.getElementById("MedicalData").value,
            childImg    : document.getElementById("childImg").innerHTML
        },({_status})=>{
            if(_status == 200){
                location.reload()
            }
            else{
                alert("אין לך הרשאה מתאימה")
            }
        })
    }
}