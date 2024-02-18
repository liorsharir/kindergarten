function AssistantItem(assistant){
    let tempAssistantImag = "https://media.npr.org/assets/img/2013/03/11/istock-4306066-baby_custom-aee07650b312c1f240125b669c2aa92a7d36e73b-s1100-c50.jpg"

    return /*html*/`
        <link rel="stylesheet" type="text/css" href="static/css/assistantItem.css"/>
        ${loop(children.length ,i=>{
            return(`
                <div id="assistant${i}" class="assistant-item" onclick="assistantClick(${i})">
                    <div id="assistant-image"><img src="${tempAssistantImag}" alt="assistantImg"/></div>                
                    <div id="assistant-name">${assistant[i].name}</div>                
                </div>
            `)
        })}
    `
}



function assistantClick(index){
    let assistant = JSON.parse(document.getElementById("data").innerText).assistants[index]
    let addAssistantActions = document.getElementById("addAssistantActions")
    let assistantList = document.getElementById("childern-list")
    addAssistantActions.style.width = "40%"
    assistantList.style.width = "60%"
    addAssistantActions.style.display = "block"
    addAssistantActions.innerHTML = EditAssistant(assistant)
}


