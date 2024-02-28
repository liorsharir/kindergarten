document.title = "ילדים"
document.getElementById("root").innerHTML = /*html*/`
    ${Header()}
    <main>
        <h1 id="childrenH1" class="h1_1"><u>ילדי גן אלה :</u></h1>
        <div id="addChildrenActions" class="actions_1"></div>
        <div id="childrenList"  class="list_1">
            <div id="childComponents" class="item_components_1">
                ${ChildrenItem(data.children)} 
            </div> 
        </div>
    </main>
`


