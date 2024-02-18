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