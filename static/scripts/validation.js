function validation(type,id,arr){
    let obj ={}
    let elements = {}
    for(let i=0 ; i< arr.length; i++){
        let elem = document.getElementById(arr[i]);
        elements[arr[i]] = elem;
        if(elem instanceof HTMLInputElement || elem instanceof HTMLSelectElement)
            obj[arr[i]] = document.getElementById(arr[i]).value;
        else
            obj[arr[i]] = document.getElementById(arr[i]).innerHTML;
    }
    if(type == "children")
        return validation_Children(obj,id,elements);
    else if(type == "assistant")
        return validation_assistant(obj,id,elements);
    else if(type == "assistantEvent")
        return validation_assistant_Event(obj,id,elements);
    else if(type == "event")
        return validation_Event(obj,id,elements);
    return false
}


function validation_Children(obj,id,elements){
    let valid = true
    let messages = []
    if(!Number.isNaN(Number.parseInt(elements.childID))){
        elements.childID.style.backgroundColor="#ff030378";messages.push("תעודת הזהות חייבת להיות מספר");valid = false
    }else elements.childID.style.backgroundColor="#FFFF"

    if(elements.childID.value.length !=9) {
        elements.childID.style.backgroundColor="#ff030378";messages.push("תעודת הזהות חייבת להכיל 9 ספרות");valid = false
    }else elements.childID.style.backgroundColor =  "#FFFF"

    if(elements.firstName.value.trim()=="") {
        elements.firstName.style.backgroundColor="#ff030378";messages.push("לילד חייב להיות שם");valid = false
    }else elements.firstName.style.backgroundColor= "none"

    if(containsDigits(elements.firstName.value)){
        elements.firstName.style.backgroundColor="#ff030378";messages.push("שם הילד לא יכול להכיל מספר");valid = false
    }else elements.firstName.style.backgroundColor= "none"


    if(elements.lastName.value.trim()=="") {
        elements.lastName.style.backgroundColor =  "#ff030378";messages.push("לילד חייב להיות שם משפחה");valid = false
    }else elements.lastName.style.backgroundColor= "none"

    if(containsDigits(elements.lastName.value)){
        elements.lastName.style.backgroundColor =  "#ff030378";messages.push("שם המשפחה לא יכול להכיל מספר");valid = false
    }else elements.lastName.style.backgroundColor= "none"


    if(containsDigits(elements.name_dad.value)){
        elements.name_dad.style.backgroundColor =  "#ff030378";messages.push("שם האבא לא יכול להכיל מספר");valid = false
    }else elements.name_dad.style.backgroundColor= "none"

    if(containsDigits(elements.name_mom.value)){
        elements.name_mom.style.backgroundColor =  "#ff030378";messages.push("שם האם לא יכול להכיל מספר");valid = false
    }else elements.name_mom.style.backgroundColor= "none"


    if(!isPhone(elements.phone_dad.value)){
        elements.phone_dad.style.backgroundColor =  "#ff030378";messages.push("מספר טלפון של האבא לא תקין");valid = false
    }else elements.phone_dad.style.backgroundColor= "none"
    
    if(!isPhone(elements.phone_mom.value)){
        elements.phone_mom.style.backgroundColor =  "#ff030378";messages.push("מספר טלפון של האמא לא תקין");valid = false
    }else elements.phone_mom.style.backgroundColor= "none"


    if(!isMail(elements.mail_dad.value)){
        elements.mail_dad.style.backgroundColor =  "#ff030378";messages.push("המייל של האבא לא תקין");valid = false
    }else elements.mail_dad.style.backgroundColor= "none"

    if(!isMail(elements.mail_mom.value)){
        elements.mail_mom.style.backgroundColor =  "#ff030378";messages.push("המייל של האמא לא תקין");valid = false
    }else elements.mail_mom.style.backgroundColor= "none"

    if(valid){
        obj["id"] = id
        let formData = new FormData()
        for(let key in obj)  formData.append(`${key}`,obj[key])
        return formData;
    }
    else{popup(/*html*/`<ul>${messages.map(m=>`<li>${m}</li>`)}</ul>`)}
    return false;
}


function validation_assistant(obj,id,elements){
    let valid = true
    let messages = []
    if(!Number.isNaN(Number.parseInt(elements.assistantId))){
        elements.assistantId.style.backgroundColor="#ff030378";messages.push("תעודת הזהות חייבת להיות מספר");valid = false
    }else elements.assistantId.style.backgroundColor="#FFFF"

    if(elements.assistantId.value.length !=9) {
        elements.assistantId.style.backgroundColor="#ff030378";messages.push("תעודת הזהות חייבת להכיל 9 ספרות");valid = false
    }else elements.assistantId.style.backgroundColor =  "#FFFF"

    if(elements.firstName.value.trim()=="") {
        elements.firstName.style.backgroundColor =  "#ff030378";messages.push(" חייב להיות שם פרטי");valid = false
    }else elements.firstName.style.backgroundColor= "none"

    if(elements.lastName.value.trim()=="") {
        elements.lastName.style.backgroundColor =  "#ff030378";messages.push("חייב להיות שם משפחה");valid = false
    }else elements.lastName.style.backgroundColor= "none"

    if(containsDigits(elements.firstName.value)){
        elements.firstName.style.backgroundColor =  "#ff030378";messages.push("שם לא יכול להכיל מספר");valid = false
    }else elements.firstName.style.backgroundColor= "none"

    if(containsDigits(elements.lastName.value)){
        elements.lastName.style.backgroundColor =  "#ff030378";messages.push("שם לא יכול להכיל מספר");valid = false
    }else elements.lastName.style.backgroundColor= "none"
   
    if(!isPhone(elements.phone.value)){
        elements.phone.style.backgroundColor =  "#ff030378";messages.push("מספר טלפון לא תקין");valid = false
    }else elements.phone.style.backgroundColor= "none"
    if(!isMail(elements.email.value)){
        elements.email.style.backgroundColor =  "#ff030378";messages.push("מייל לא תקין");valid = false
    }else elements.email.style.backgroundColor= "none"


    if(valid){
        obj["userID"] = obj["assistantId"]
        obj["id"] = id
        let formData = new FormData()
        for(let key in obj){
            formData.append(`${key}`,obj[key])
        }
        return formData;
    }
    else{popup(/*html*/`<ul>${messages.map(m=>`<li>${m}</li>`)}</ul>`)}
    return false;
}   



function validation_assistant_Event(obj){
    nameOfAssistant = data.assistants.find(a=>a.id==obj["assistantOfEvent"].value)
    return {
        eventObj:{
            summary: "any",
            location:  'לא צוין מיקום',
            description: `${obj["bodyOfEvent"].value} <br/>  סייעת: ${nameOfAssistant.name}`,
            start: {
                dateTime: `${obj['dateOfEvent'].value}T${obj["startHourOfEvent"].value}:00+02:00`,
                timeZone: "Asia/Jerusalem"
            },
            end: {
                dateTime: `${obj['dateOfEvent'].value}T${obj["endHourOfEvent"].value}:00+02:00`,
                timeZone: "Asia/Jerusalem"
            },
            recurrence: [],
            attendees : [],
            reminders : {
                useDefault: false,
                overrides:  [
                    {method: 'email', minutes: 24 * 60},
                    {method: 'popup', minutes: 10},
                ]
            }
        },
        assistantOfEvent : obj["assistantOfEvent"].value
    }
}   


function validation_Event(obj){
    return true
}   



function containsDigits(str) {return /\d/.test(str);}
function isPhone(phoneNumber){
    const regex = /^05\d{8}$/;
    return regex.test(phoneNumber.replaceAll('-',""));
}
function isMail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}