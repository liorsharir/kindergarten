from flask import Request, render_template
from tools import margeJson
from server.User import User
from server.Actions     import Actions

Action = Actions()
KINDERGARTNERID = User.getKINDERGARTNERIDId()

def ResponsePage(request:Request,page=[],comps=[],scripts=[],auth=[],dataByAuth=[["",[]]] ,kickout=["404.js"],sendData=[]):
    user = User.getUserByToken(request.cookies.get('token'))
    send = [user.toJson()]
    send.append(f'"KINDERGARTNERID":"{KINDERGARTNERID}",')
    if(user.id != "-1"):
        send.append(Action.getAllMessageById(user.id))
    for item in sendData: 
        send.append(item)
        
    for i in dataByAuth:
        if user.isAuth(i[0]) :
            for item in i[1]: 
                send.append(item)     
        
    if user.isAuth(auth) : 
        return render_template('index.html',page=page ,scripts=scripts ,components = comps, data=margeJson(send))
    else                 : 
        return render_template('index.html',page=kickout , data="{}")



def checkPermission(Auth:list, request:Request) ->bool:
    user = User.getUserByToken(request.cookies.get('token'))
    return user.isAuth(Auth)

