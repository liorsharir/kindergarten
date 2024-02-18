function validation(type,obj){
    console.log("valdation")
    if(type == "addChildren" || type == "updateChildren"){
        return validation_Children(obj);
    }
    else if(type == "addAssistance" || type == "updateAssistance"){
        return validation_Assistance(obj);
    }
    else if(type == "addEvent" || type == "updateEvent"){
        return validation_Event(obj);
    }
    return false
}





function validation_Children(obj){
    let valid = true
    if(obj.childId.value.length != 9 ) {
        obj.childId.style.backgroundColor =  "#ff030378"
        valid = false
    }else{
        console.log(obj)
        obj.childId.style.backgroundColor =  ""
        obj.childId.style.backgroundColor =  "#FFFF"
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
    return valid;
}

function validation_Assistance(obj){
    return true
}   

function validation_Event(obj){
    return true
}   

