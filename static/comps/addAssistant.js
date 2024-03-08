let assistant = {id:"-1",userID:"-1",firstName:"",lastName:"",birthday:"",phone:"",email:"",gender:"",avatar:""};
let file;

function AddAssistant(index){
    if(index != undefined) assistant = data.assistants[index]
    else                   assistant = {id:"-1",userID:"-1",firstName:"",lastName:"",birthday:"",phone:"",email:"",gender:"female",avatar:"static/img/genericAssistant.png"}
    return /*html*/`
        <div id="addAssistant" class="add_item">
            <div id="AddAssistantExit" class="Exit" onclick="ExitActionAssistant()">X</div>
            <div id="formAssistant" class="form_add">
                <div id="assistantData" class="form_data">
                    <label>ת"ז </label>       <input type="text" id="assistantId"  value="${assistant.userID}" disable="${Number.isInteger(index)}"/> 
                    <label>שם פרטי</label>     <input type="text" id="firstName"    value="${assistant.firstName}"/> 
                    <label>שם משפחה</label>    <input type="text" id="lastName"     value="${assistant.lastName}"/> 
                    <label>תאריך לידה</label>  <input type="date" id="birthday"     value="${assistant.birthday}"/>
                    <label>טלפון</label>        <input type="text" id="phone"       value="${assistant.phone}"/>
                    <label>מייל</label>        <input type="email" id="email"       value="${assistant.email}"/>
                    <label>סיסמה</label>        <input type="password" id="password" value="123123"/>
                    <label>מין</label>        <select id="assistantGender" class="genderSelect Size1"> <option value="female" ${assistant.gender=='female' ? "selected":""}>female</option>     <option value="male" ${assistant.gender=='male' ? "selected":""}>male</option>    </select>

                </div>
                <div id="assistantImgContainer" class="ImgContainer" onclick="changeImg()">
                    <img id="assistantImg" src="${assistant.avatar}" alt="Assistant_img"/>
                </div>
            </div>
            ${render(data.user.auth=="KINDERGARTNER",/*html*/`
                <div id="assistantAction" class="form_actions">
                    ${render(
                        index != undefined,
                        /*html*/`
                            <div id="deleteAssistant" class="delete" onclick="deleteAssistantHandler()">מחק</div>
                            <div id="saveAssistant" class="save" onclick="addAssistantHandler('updateAssistant')">שמור</div>
                        `,
                        /*html*/`<div id="saveAssistant" class="save" onclick="addAssistantHandler('addAssistant')">הוסף</div>`
                    )}
                </div>
            `)}
        </div>
    `
}


function ExitActionAssistant(){
    let element1  = document.getElementById("assistantList")
    let element2  = document.getElementById("assistantComponents")
    let element3  = document.getElementById("assistantH1")
    let element4  = document.getElementById("addAssistantActions")
    element1.className = "list_1" 
    element2.className = "item_components_1"         
    element3.className = "h1_1"     
    element4.className = "actions_1"         
    element4.innerHTML = ""
    file=null;
}

function addAssistantHandler(type){
    let ArrIDs = ["assistantId","firstName","lastName","password","email","birthday","assistantGender","phone"]
    let resultValidation = validation("assistant",assistant.id,ArrIDs) 
    if(file)    resultValidation.append('image', file);

    if(resultValidation)
        POST(`/${type}`,resultValidation,(respone)=>{
            if(respone.status == 200){
                if(assistant.id=="-1")
                    Alert("הסייעת נוספה בהצלחה","Good",1000,()=>location.reload())
                else
                    Alert("הסייעת עודכנה בהצלחה","Good",1000,()=>location.reload())
            }
            else
                alert("אין לך הרשאה לפעולה זו")
        })
}

function deleteAssistantHandler(){
    confirm("האם את בטוחה שכדאי למחוק את הסייעת :_(",(answer)=>{
        if(answer){
            POST("/removeAssistant",{id: assistant.id} ,(respone)=>{
                if(respone.status == 200)
                    location.reload()
                else
                    alert("אין לך הרשאה לפעולה זו")
            })
        }
    })
}

function changeImg(){
    confirm(/*html*/`<h3>העלאת תמונה</h3><br/>   <input type="file" id="ImgUpload" accept="image/png, image/jpeg">` ,(answer)=>{
        if(answer)  uploadImag()
    },"העלאה","בטל")
}

function uploadImag(){
    file = document.getElementById('ImgUpload').files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {document.getElementById('assistantImg').src = e.target.result;};
        reader.readAsDataURL(file); 
    }
}