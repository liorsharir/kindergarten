function AssistantItem(assistant){
    return /*html*/`
        ${loop(assistant.length ,i=>{
            return(/*html*/`
                <div id="assistant${i}" class="item" onclick="assistantClick(${i})">
                    <div class="item_image pointer"><img src="${assistant[i].avatar}" alt="assistantImg"/></div>                
                    <div class="item_name">${assistant[i].name}</div>                
                </div>
            `)
        })}
        ${render(data.user.auth == "KINDERGARTNER",/*html*/`
            <div class="item addItem" id="addItemAssistance" onclick="assistantClick()">
                <div class="item_image pointer" id="icon-Plus">+</div>
                <div class="item_name">הוספת סייעת חדשה</div>
            </div>
        `)}
    `
}



function assistantClick(index){
    let element1  = document.getElementById("assistantH1")
    let element2  = document.getElementById("assistantList")
    let element3  = document.getElementById("assistantComponents")
    let element4  = document.getElementById("addAssistantActions")
    element1.className  = "h1_2"         
    element2.className  = "list_2" 
    element3.className  = "item_components_2"         
    element4.className  = "actions_2"            
    element4.innerHTML  = AddAssistant(index)
}