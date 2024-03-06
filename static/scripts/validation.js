function validation(type,arr){
    console.log("valdation")
    let obj ={}


    for(let i=0 ; i< arr.length; i++){
        obj[arr[i]] = document.getElementById(arr[i]);
    }

    if(type == "children"){
        console.dir(validation_Children(obj))
        return validation_Children(obj);
    }
    else if(type == "assistant")
        return validation_assistant(obj);
    else if(type == "assistantEvent")
        return validation_assistant_Event(obj);
    else if(type == "event")
        return validation_Event(obj);
    return false
}





function validation_Children(obj){
    let valid = true
    if(obj.childId.value.length != 9 ) {
        obj.childId.style.backgroundColor =  "#ff030378"
        document.getElementById("validation_childId").innerHTML = "התז חייב להיות בעל 9 תווים"
        valid = false
    }else{
        console.log(111)
        obj.childId.style.backgroundColor =  ""
        obj.childId.style.backgroundColor =  "#FFFF"
        document.getElementById("validation_childId").innerHTML = ""
    }
    if(obj.firstName.value.trim()=="") {
        obj.childId.style.backgroundColor =  "#ff030378"
        valid = false
    }else{
        obj.childId.style.backgroundColor =  "none"
    }
    if(obj.lastName.value.trim()=="") {
        obj.childId.style.backgroundColor =  "#ff030378"
        valid = false
    }else{
        obj.childId.style.backgroundColor =  "none"
    }

    if(valid){
        return {
            childId     : obj["childId"].value,
            firstName   : obj["firstName"].value,
            lastName    : obj["lastName"].value,
            birthday    : obj["birthday"].value,
            gender      : obj["childGender"].value,
            name_dad    : obj["name_dad"].value,
            phone_dad   : obj["phone_dad"].value,
            mail_dad    : obj["mail_dad"].value,
            name_mom    : obj["name_mom"].value,
            phone_mom   : obj["phone_mom"].value,
            mail_mom    : obj["mail_mom"].value,
            MedicalData : obj["MedicalData"].value,
            childImg    : obj["childImg"].src
        }
    }
    return false;
}


function validation_assistant(obj){
    return {
        assistantId  :   obj["assistantId"].value,
        firstName    :   obj["firstName"].value,
        lastName     :   obj["lastName"].value,
        email        :   obj["email"].value,
        password     :   obj["password"].value,
        birthday     :   obj["birthday"].value,
        gender       :   obj["assistantGender"].value,
        avatar       :   obj["assistantImg"].src,
    }
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

