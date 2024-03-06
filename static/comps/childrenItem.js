function ChildrenItem(children){
    return /*html*/`
        ${loop(children.length ,i=>{
            let genderIcon = (children[i].gender == "male")? "static/img/male.png" :"static/img/female.png";
            if(!children[i].image) children[i].image="static/img/genericChild.png"
            return( /*html*/`
                <div id="child${i}" class="item" onclick="childClick(${i})">
                    <div class="item_gender"><img src="${genderIcon}" alt="genderImg"/></div>
                    <div class="item_image pointer"><img src="${children[i].image}" id="img${children[i].id}" alt="chidrenImg"/></div>                
                    <div class="item_name">${children[i].name}</div>                
                </div>
            `)
        })}
        ${render(data.user.auth == "KINDERGARTNER",/*html*/`
            <div class="item addItem" onclick="childClick()">
                <div class="item_image pointer" id="icon-Plus">+</div>
                <div class="item_name">הוספת ילד חדש</div>
            </div>
        `)}
    `
}





function childClick(index){
    let element1  = document.getElementById("childrenH1")
    let element2  = document.getElementById("childrenList")
    let element3  = document.getElementById("childComponents")
    let element4  = document.getElementById("addChildrenActions")
    element1.className      = "h1_2"         
    element2.className      = "list_2" 
    element3.className      = "item_components_2"         
    element4.className      = "actions_2"         
    element4.innerHTML      = AddChildren(index)
}