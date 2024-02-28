function ChildrenItem(children){
    let tempChildImag = "https://media.npr.org/assets/img/2013/03/11/istock-4306066-baby_custom-aee07650b312c1f240125b669c2aa92a7d36e73b-s1100-c50.jpg"
    return /*html*/`
        ${loop(children.length ,i=>{
            let genderIcon = (children[i].gender == "male")? "static/img/male.png" :"static/img/female.png";
            return( /*html*/`
                <div id="child${i}" class="item" onclick="childClick(${i})">
                    <div class="item_gender"><img src="${genderIcon}" alt="genderImg"/></div>
                    <div class="item_image pointer"><img src="${tempChildImag}" alt="chidrenImg"/></div>                
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