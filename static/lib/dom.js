class DOMElement{
   
   static create(tag="div",obj){
        let Element = document.createElement(tag);

        if(obj){
            if(obj["id"])
                Element.id = obj["id"]
            if(obj["className"])
                Element.className = obj["className"]
            if(obj["dadId"])
                document.getElementById(obj["dadId"]).appendChild(Element)
        }
       
        return Element
    }

}