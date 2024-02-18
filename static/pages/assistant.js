const data = JSON.parse(document.getElementById("data").innerText)

document.title = "סייעות"
document.getElementById("root").innerHTML = /*html*/`
    <link rel="stylesheet" type="text/css" href="static/css/assistants.css"/>
    ${Header(data)}
    <main>
        <div id="assistants-container">
            <div id="addAssistantsActions" style="display:none"></div>
            <div id="assistants-list">
                <h1>סייעות גן אלה :</h1> <br>
                <div id="assistantsComponents">
                    ${AssistantsItem(data.assistants)}
                    <div id="AddAssistantBtn" class="assistant-item" onclick="AddAssistantClick()">
                        <div id="icon-Plus">+</div>
                        <div>הוספת סייעת חדשה</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
`





function AddAssistantClick(){
    let addAssistantsActions = document.getElementById("addAssistantsActions")
    let assistantsList = document.getElementById("assistants-list")
    addAssistantsActions.style.width = "40%"
    assistantsList.style.width = "60%"
    addAssistantsActions.style.display = "block"
    addAssistantsActions.innerHTML = AddChildren()
}