let child ={id:"-1",childID:"-1",image:"static/img/genericChild.png",firstName:"",lastName:"",birthday:"",fatherName:"",fatherEmail:"",fatherPhone:"",motherName:"",motherEmail:"",motherPhone:"",medicalInfo:""}
let file;
let disable = ""
let changeImag = "changeImg()"
if(data.user.auth =="ASSISTANCE"){
    disable ="disabled";
    changeImag = ""
}

function AddChildren(index){
    if(index != undefined)  child = data.children[index]
    else                    child = {id:"-1",childID:"-1",image:"static/img/genericChild.png",firstName:"",gender:"male",lastName:"",birthday:"",fatherName:"",fatherEmail:"",fatherPhone:"",motherName:"",motherEmail:"",motherPhone:"",medicalInfo:""}
    return /*html*/`
        <div id="AddChildren" class="add_item">
            <div id="AddChildrenExit" class="Exit" onclick="ExitActionChildren()">X</div>
            <div id="formChid" class="form_add">
                <div id="childData" class="form_data">
                    <label >ת"ז </label>      <div class="validationInp"> <input ${disable} type="text" id="childID" class="withValidation Size1" value="${child.childID}"/> <span id="validation_childID"></span>   </div>
                    <label>שם פרטי</label>    <div class="validationInp"> <input ${disable} type="text" id="firstName" class="withValidation Size1" value="${child.firstName}"/>                                  <span id="validation_firstName"></span> </div>
                    <label>שם משפחה</label>   <div class="validationInp"> <input ${disable} type="text" id="lastName" class="withValidation Size1" value="${child.lastName}"/>                                    <span id="validation_lastName"></span>  </div>
                    <label>תאריך לידה</label> <div class="validationInp"> <input ${disable} type="date" id="birthday" class="withValidation Size1" value="${child.birthday}"/>                                    <span id="validation_birthday"></span>  </div>
                    <label>מין</label>        <select ${disable} id="childGender" class="genderSelect Size1">    <option value="male" ${child.gender=='male' ? "selected":""}>male</option> <option value="female" ${child.gender=='female' ? "selected":""}>female</option>     </select>
                </div>
                <div id="childImgContainer" class="ImgContainer" onclick=${changeImag}>
                    <img id="childImg" src="${child.image}" alt="child_img"/>
                </div>
            </div>
            <div id="parents">
                <div id="formDad">
                    <label class="Size1 label1">שם האב</label> <input ${disable} type="text" id="name_dad" class="Size1" value="${child.fatherName}"/> 
                    <label class="Size1 label1">פלא</label>    <input ${disable} type="text" id="phone_dad" class="Size1" value="${child.fatherPhone}"/> 
                    <label class="Size1 label1">מייל</label>   <input ${disable} type="text" id="mail_dad" class="Size1" value="${child.fatherEmail}"/>
                </div>
                <div id="formMom">
                    <label class="Size1 label1">שם האם</label> <input ${disable} type="text" id="name_mom" class="Size1" value="${child.motherName}"/> 
                    <label class="Size1 label1">פלא</label>    <input ${disable} type="text" id="phone_mom"class="Size1" value="${child.motherPhone}"/> 
                    <label class="Size1 label1">מייל</label>   <input ${disable} type="text" id="mail_mom" class="Size1" value="${child.motherEmail}"/>
                </div>
            </div>
            <div id="MedicalInformation">
                <label>מידע רפואי</label> <textarea ${disable} id="MedicalData">${child.medicalInfo}</textarea>
            </div>
            ${render(data.user.auth=="KINDERGARTNER",/*html*/`
                <div id="childAction" class="form_actions">
                    ${render(
                        index != undefined,
                        /*html*/`
                            <div id="deleteChild" class="delete" onclick="deleteChildrenHandler()">מחק</div>
                            <div id="saveChild"   class="save" onclick="addChildrenHandler('updateChildren')">שמור</div>
                        `,
                        /*html*/`
                            <div id="saveChild" class="save" onclick="addChildrenHandler('addChildren')">הוסף</div>
                    `)}
                </div>
            `)}
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
    file=null;
}

function addChildrenHandler(type){
    let ArrIDs = ["childID","firstName","lastName","birthday","childGender","name_dad","phone_dad","mail_dad","name_mom","phone_mom","mail_mom","MedicalData"]
    let resultValidation = validation("children",child.id,ArrIDs) 
    if(file)    resultValidation.append('image', file);

    if(resultValidation){
        POST(`/${type}`,resultValidation,(respone)=>{
            if(respone.status == 200)
                if(child.id=="-1")
                    Alert("הילד נוסף בהצלחה","Good",1000,()=>location.reload())
                else
                    Alert("הילד עודכן בהצלחה","Good",1000,()=>location.reload())
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}

function deleteChildrenHandler(){
    confirm("האם את בטוחה שכדאי למחוק את הילד :_(" ,(answer)=>{
        if(answer){
            POST("/removeChildren",{id: child.id} ,(respone)=>{
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
        reader.onload = function(e) {document.getElementById('childImg').src = e.target.result;};
        reader.readAsDataURL(file); 
    }
}