class Table{
    constructor(headers=[],opt={}){
        this.container = document.createElement("div")
        this.table = document.createElement("div");
        this.table.className = "table";
        this.headers = headers;
        this.table.style.display = "grid";
        this.table.style.gridTemplateColumns = `repeat(${headers.length},1fr)`;
        
        if(opt.id)
            this.table.id = opt.id

        this.addHeader();
        this.container.appendChild(this.table)
    }

    addRow(row=[]){
        row.forEach(col=>{
            let td = document.createElement("div");
            td.className = "td";
            td.innerHTML = col;
            this.table.appendChild(td);
        })
    }
    addHeader(){
        this.headers.forEach(h=>{
            let th = document.createElement("div");
            th.className = "th";
            th.innerHTML = h
            this.table.appendChild(th)
        })
    }


    getHtml(){
        return this.container.innerHTML
    }

}