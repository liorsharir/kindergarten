import logging

from flask import Flask,request ,jsonify
from server.User import User , Authorization
from server.permission import ResponsePage ,checkPermission
from server.Actions import Action
app = Flask(__name__)
logging.getLogger('werkzeug').setLevel(logging.WARNING)

GUEST         = "GUEST"
ASSISTANCE    = "ASSISTANCE"
KINDERGARTNER = "KINDERGARTNER"



#page 
@app.route('/',methods=['GET']) 
@app.route('/home',methods=['GET']) 
def home():
    return ResponsePage(
        request,
        page     = ["home.js"],
        comps    = ["header.js","aboutUs.js"],
        auth     = [ASSISTANCE,KINDERGARTNER],
        kickout  = ["login.js"],
    )
 
@app.route('/children',methods=['GET']) 
def Children():
    return ResponsePage(
        request,
        page     = ["children.js"],
        comps    = ["header.js","childrenItem.js","addChildren.js","editChildren.js"],
        scripts  = ["validation.js"],
        auth     = [ASSISTANCE,KINDERGARTNER],
        sendData = [Action.GetAllChildern()],
    )
    
@app.route('/assistant',methods=['GET']) 
def Assistant():
    return ResponsePage(
        request,
        page     = ["assistant.js"],
        comps    = ["header.js","assistantItem.js","addAssistant.js","editAssistant.js"],
        scripts  = ["validation.js"],
        auth     = [ASSISTANCE,KINDERGARTNER],
        sendData = [Action.GetAllChildern()],
    )

@app.route('/login',methods=['GET']) 
def Login():
    return ResponsePage(
        request,
        page     = ["login.js"],
        scripts  = ["validation.js"],
        auth     = [GUEST],
    )


# ----------------------------------------------------
@app.route('/loginin',methods=['POST'])
def Loginin():
    if checkPermission([GUEST],request):
        newToken = User.Login(request.get_json()['email'],request.get_json()['password'])
        if(newToken):
            return jsonify({"status":"200","newToken":newToken})
    return jsonify({"status":"400"})
    

@app.route('/loginout',methods=['POST'])
def Loginout():
    User.Loginout(request.cookies.get("token"))
    return jsonify({"status":"200"})
    



# ----------------------------------------------------

@app.route('/addChildren',methods=['POST'])
def AddChildren():
    if checkPermission(["KINDERGARTNER"],request):
        Action.AddChildern(request.get_json())
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})
    
@app.route('/updateChildren',methods=['POST'])
def UpdateChildren():
    if checkPermission(["KINDERGARTNER"],request):
        Action.UpdateChildern(request.get_json())
        return jsonify({"status":"200"})
    return jsonify({"status":"401"}) 

@app.route('/removeChildren',methods=['POST'])
def RemoveChildren():
    if checkPermission(["KINDERGARTNER"],request):
        Action.RemoveChildern(request.get_json())
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

# ----------------------------------------------------

@app.route('/addAssistant',methods=['POST'])
def AddAssistant():
    if checkPermission(["KINDERGARTNER"],request):
        Action.AddAssistant(request.get_json())
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})
    
@app.route('/updateAssistant',methods=['POST'])
def UpdateAssistant():
    if checkPermission(["KINDERGARTNER"],request):
        Action.UpdateAssistant(request.get_json())
        return jsonify({"status":"200"})
    return jsonify({"status":"401"}) 

@app.route('/removeAssistant',methods=['POST'])
def RemoveAssistant():
    if checkPermission(["KINDERGARTNER"],request):
        Action.RemoveAssistant(request.get_json())
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})


# ----------------------------------------------------



# ----------------------------------------------------

app.run(debug=True) 