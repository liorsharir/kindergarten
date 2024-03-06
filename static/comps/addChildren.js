function AddChildren(index){
    let child;
    if(index != undefined)
        child = data.children[index]
    else
        child = {id:"",image:"static/img/genericChild.png",firstName:"",lastName:"",birthday:"",fatherName:"",fatherEmail:"",fatherPhone:"",motherName:"",motherEmail:"",motherPhone:"",medicalInfo:""}



    return /*html*/`
        <div id="AddChildren" class="add_item">
            <div id="AddChildrenExit" class="Exit" onclick="ExitActionChildren()">X</div>
            <div id="formChid" class="form_add">
                <div id="childData" class = "form_data">
                    <label >ת"ז </label>        <div class="validationInp"> <input type="text" id="childId"   class="withValidation Size1"  value="${child.id.substring(1)}"    disable="${Number.isInteger(index)}"     />                <span id="validation_childId"></span>   </div>
                    <label>שם פרטי</label>      <div class="validationInp"> <input type="text" id="firstName" class="withValidation Size1"  value="${child.firstName}" />                                                     <span id="validation_firstName"></span> </div>
                    <label>שם משפחה</label>     <div class="validationInp"> <input type="text" id="lastName"  class="withValidation Size1"  value="${child.lastName}"  />                                                     <span id="validation_lastName"></span>  </div>
                    <label>תאריך לידה</label>   <div class="validationInp"> <input type="date" id="birthday"  class="withValidation Size1"  value="${child.birthday}"  />                                                     <span id="validation_birthday"></span>  </div>
                    <label>מין</label>            
                    <select id="childGender" class="genderSelect Size1">
                        <option value="male">male</option>>
                        <option value="female">female</option>>
                    </select>
                </div>
                <div id="childImgContainer" class="ImgContainer" onclick="changeImg('${child.id}')">
                    <img id="childImg"  src="${child.image}" alt="child_img"/>
                </div>
            </div>
            <div id="parents">
                <div id="formDad">
                    <label class="Size1 label1">שם האב</label>   <input type="text" id="name_dad"  class="Size1" value="${child.fatherName}" /> 
                    <label class="Size1 label1">פלא</label>      <input type="text" id="phone_dad" class="Size1" value="${child.fatherPhone}"  /> 
                    <label class="Size1 label1">מייל</label>     <input type="text" id="mail_dad"  class="Size1" value="${child.fatherEmail}"  />
                </div>
                <div id="formMom">
                    <label class="Size1  label1">שם האם</label>  <input type="text" id="name_mom" class="Size1" value="${child.motherName}" /> 
                    <label class="Size1  label1">פלא</label>     <input type="text" id="phone_mom"class="Size1" value="${child.motherPhone}"  /> 
                    <label class="Size1  label1">מייל</label>    <input type="text" id="mail_mom" class="Size1" value="${child.motherEmail}"  />
                </div>
            </div>
            
            <div id="MedicalInformation">
                <label>מידע רפואי</label> <textarea id="MedicalData">${child.medicalInfo}</textarea>
            </div>
            <div id="childAction" class="form_actions">
                ${render(index != undefined , /*html*/`
                    <div id="deleteChild" class="delete" onclick="deleteChildrenHandler()">מחק</div>
                    <div id="saveChild"   class="save" onclick="addChildrenHandler('updateChildren')">שמור</div>
                `,/*html*/`
                    <div id="saveChild" class="save" onclick="addChildrenHandler('addChildren')">הוסף</div>
                `)}
            </div>
        </div>
    `
}


function ExitActionChildren(){
    let element1  = document.getElementById("childrenList")
    let element2  = document.getElementById("childComponents")
    let element3  = document.getElementById("childrenH1")
    let element4  = document.getElementById("addChildrenActions")
    element1.className = "list_1" 
    element2.className = "item_components_1"         
    element3.className = "h1_1"     
    element4.className = "actions_1"         
    element4.innerHTML = ""
}

function addChildrenHandler(type){
    let ArrIDs = ["childId","firstName","lastName","birthday","childGender","name_dad","phone_dad","mail_dad","name_mom","phone_mom","mail_mom","MedicalData","childImg",]
    let resultValidation = validation("children",ArrIDs) 
    if(resultValidation){
        POST(`/${type}`,resultValidation,(respone)=>{
            if(respone.status == 200)
                Alert("הילד נוסף בהצלחה","Good",()=>location.reload())
                
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}

function deleteChildrenHandler(){
    confirm("האם את בטוחה שכדאי למחוק את הילד :_(" ,(answer)=>{
        if(answer){
            POST("/removeChildren",{childId: 'i'+document.getElementById("childId").value} ,(respone)=>{
                if(respone.status == 200)
                    location.reload()
                else
                    alert("אין לך הרשאה לפעולה זו")
            })
        }
    })
   
}


function changeImg(childID){
    PopUp("העלאת תמונה","" ,()=>/*html*/`
        <input type="file" id="ImgUpload" accept="image/png, image/jpeg">
        <button onclick="uploadImag('${childID}')">בחר</button>
    `)
}

function uploadImag(childID){
    console.log("childID",childID)
    let childImg = document.getElementById("childImg")
    let childItem = document.getElementById("img"+childID)

    var file = document.getElementById('ImgUpload').files[0];
    var formData = new FormData();
    formData.append('image', file);
    formData.append('chidID', childID);

    fetch('/uploadChildrenImg', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        if(response.status == 200){
            childImg.src = response.path 
            childItem.src = response.path 
            Alert("התמונה שונתה בהצלחה!")
        }
        else{
            alert("ישנה בעיה בהעלאת התמונה")
        }
    })

}