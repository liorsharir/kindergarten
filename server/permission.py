from flask import Request, render_template
from Tools import margeJson
from server.User import User


def ResponsePage(request:Request,page=[],comps=[],scripts=[],auth=[],kickout=["404.js"],sendData=[]):
    user = User.getUserByToken(request.cookies.get('token'))
    send = [user.toJson()]
    for item in sendData: 
        send.append(item)
    if user.isAuth(auth) : 
        return render_template('index.html',page=page ,scripts=scripts ,components = comps, data=margeJson(send))
    else                 : 
        return render_template('index.html',page=kickout , data="{}")



def checkPermission(Auth:list, request:Request) ->bool:
    user = User.getUserByToken(request.cookies.get('token'))
    return user.isAuth(Auth)

