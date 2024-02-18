const data = JSON.parse(document.getElementById("data").innerText)

document.title = "ילדים"
document.getElementById("root").innerHTML = /*html*/`
<link rel="stylesheet" type="text/css" href="static/css/children.css"/>
    ${Header(data)}
    <main>
        <div id="children-container">
            <div id="addChildrenActions" style="display:none"></div>
            <div id="childern-list">
                <h2>ילדי גן אלה :</h2> <br>
                <div id="childComponents">
                    ${ChildrenItem(data.children)}
                    ${render(data.user.auth == "KINDERGARTNER",/*html*/`
                        <div id="AddChildrenBtn" class="children-item" onclick="AddChildrenClick()">
                        <div id="icon-Plus">+</div>
                        <div>הוספת ילד חדש</div>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    </main>
`


function AddChildrenClick(){
    let addChildrenActions = document.getElementById("addChildrenActions")
    let childernList = document.getElementById("childern-list")
    addChildrenActions.style.width = "40%"
    childernList.style.width = "60%"
    addChildrenActions.style.display = "block"
    addChildrenActions.innerHTML = AddChildren()
}