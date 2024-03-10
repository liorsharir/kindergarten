document.title = "סייעות"
document.getElementById("root").innerHTML = /*html*/`
    ${Header()}
    <main>
        ${render(data.user.auth == "KINDERGARTNER",/*html*/`
            <h1 id="assistantH1" class="h1_1"><u>סייעות גן אלה :</u></h1>
            <div id="addAssistantActions" class="actions_1"></div>
            <div id="assistantList" class="list_1">
                <div id="assistantComponents" class="item_components_1">
                    ${AssistantItem(data.assistants)} 
                </div> 
            </div>
        `)}
    </main>

    ${render(data.user.auth == "ASSISTANCE",/*html*/`
            ${FreeDay()}
        `)}


    <div id="CalendarAsistanceContainer">
        ${render(data.user.auth == "KINDERGARTNER",/*html*/`
           ${CalendarAsistance()}
        `)}
    <div>

`





