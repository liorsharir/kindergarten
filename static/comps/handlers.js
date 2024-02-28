function changeImg(){
    
}








function deleteChildrenHandler(){
    let answer = confirm("האם את בטוחה שכדאי למחוק את הילד :_(")
    if(answer){
        POST("/removeChildren",{childId: document.getElementById("childId").value} ,(respone)=>{
            if(respone.status == 200)
                location.reload()
            else
                alert("אין לך הרשאה לפעולה זו")
        })
    }
}


