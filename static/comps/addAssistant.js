function AddAssistant(index){
    let assistant;
    if(index != undefined)
        assistant = data.assistants[index]
    else
        assistant = {id:"",firstName:"",lastName:"",birthday:"",phone:"",email:"",gender:"",avatar:""}



    return /*html*/`
        <div id="addAssistant" class="add_item">
            <div id="AddAssistantExit"   class="Exit"  onclick="ExitActionAssistant()">X</div>
            <div id="formAssistant"  class="form_add">
                <div id="assistantData" class = "form_data">
                    <label >ת"ז </label>        <input type="text" id="assistantId" value="${assistant.id.substring(1)}"       disable="${Number.isInteger(index)}"  /> 
                    <label>שם פרטי</label>      <input type="text" id="firstName"   value="${assistant.firstName}" /> 
                    <label>שם משפחה</label>     <input type="text" id="lastName"    value="${assistant.lastName}"  /> 
                    <label>תאריך לידה</label>   <input type="date" id="birthday"    value="${assistant.birthday}"  />
                    <label>email</label>        <input type="email" id="email"       value="${assistant.email}"  />
                    <label>סיסמה</label>        <input type="password" id="password" value="${assistant.password}"  />
                    <label>מין</label>            
                    <select id="assistantGender" class="genderSelect">
                        <option value="female">female</option>>
                        <option value="male">male</option>>
                    </select>
                </div>
                <div id="assistantImgContainer"  class="ImgContainer"  onclick="changeImg('${assistant.id}')">
                    <img id="assistantImg" src="${assistant.avatar}" alt="Assistant_img"/>
                </div>
            </div>
           
            <div id="assistantAction" class="form_actions">
                ${render(index != undefined , /*html*/`
                    <div id="deleteAssistant" class="delete" onclick="deleteAssistantHandler()">מחק</div>
                    <div id="saveAssistant"   class="save" onclick="addAssistantHandler('updateAssistant')">שמור</div>
                `,/*html*/`
                    <div id="saveAssistant"  class="save" onclick="addAssistantHandler('addAssistant')">הוסף</div>
                `)}
            </div>
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
}

function addAssistantHandler(type){
    let ArrIDs = ["assistantId","firstName","lastName","password","email","birthday","assistantGender","assistantImg"]
    let resultValidation = validation("assistant",ArrIDs) 
    if(resultValidation){
        POST(`/${type}`,resultValidation,(respone)=>{
            if(respone.status == 200)
                location.reload()
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}

function deleteAssistantHandler(){
    let answer = confirm("האם את בטוחה שכדאי למחוק את הסייעת :_(")
    if(answer){
        POST("/removeAssistant",{assistantId: 'i'+document.getElementById("assistantId").value} ,(respone)=>{
            if(respone.status == 200)
                location.reload()
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}

function changeImg(userID){
    PopUp("העלאת תמונה","" ,()=>/*html*/`
        <input type="file" id="ImgUpload" accept="image/png, image/jpeg">
        <button onclick="uploadImag('${userID}')">בחר</button>
    `)
}

function uploadImag(userID){
    console.log("assistantID",userID)
    let assistantImg = document.getElementById("assistantImg")
    let assistantItem = document.getElementById("img"+userID)


    var file = document.getElementById('ImgUpload').files[0];
    var formData = new FormData();
    formData.append('image', file);
    formData.append('userID', userID);
    console.log(userID)

    fetch('/uploadUserImg', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        if(response.status == 200){
            assistantImg.src = response.path 
            assistantItem.src = response.path 
            alert("התמונה שונתה בהצלחה!")
        }
        else{
            alert("ישנה בעיה בהעלאת התמונה")
        }
    })

}