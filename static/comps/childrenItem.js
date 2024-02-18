function ChildrenItem(children){
    let tempChildImag = "https://media.npr.org/assets/img/2013/03/11/istock-4306066-baby_custom-aee07650b312c1f240125b669c2aa92a7d36e73b-s1100-c50.jpg"

    return /*html*/`
        <link rel="stylesheet" type="text/css" href="static/css/childrenItem.css"/>
        ${loop(children.length ,i=>{
            return(`
                <div id="child${i}" class="children-item" onclick="childClick(${i})">
                    <div id="child-image"><img src="${tempChildImag}" alt="chidrenImg"/></div>                
                    <div id="child-name">${children[i].name}</div>                
                </div>
            `)
        })}
    `
}



function childClick(index){
    let child = JSON.parse(document.getElementById("data").innerText).children[index]
    let addChildrenActions = document.getElementById("addChildrenActions")
    let childernList = document.getElementById("childern-list")
    addChildrenActions.style.width = "40%"
    childernList.style.width = "60%"
    addChildrenActions.style.display = "block"
    addChildrenActions.innerHTML = EditChildren(child)
}


