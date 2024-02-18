function loop(num,call){
    let result = ''
    for(let i=0;i<num;i++)
        result += call(i)
    return result
}

