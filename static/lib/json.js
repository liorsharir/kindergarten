function JsonConvert(text){
    console.log(text)
    text = text.replaceAll(`\\`,"")
    text = text.replaceAll(`"{`,"{")
    text = text.replaceAll(`}"`,"}")
    console.log(JSON.parse(text))
    return  JSON.parse(text)[0]
}
 