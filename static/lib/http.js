async function GET(get,opt ,call){
    await fetch(get,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
        },
    })
    if(call) call()
}
async function POST(path,data,call){
    if(data instanceof FormData){
            let api = await fetch(path,{
            method:"POST",
            body:data
        })
        let res = await api.json()
        if(call) call(res)
    }
    else {
        let api = await fetch(path,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        let res = await api.json()
        if(call) call(res)
    }

}