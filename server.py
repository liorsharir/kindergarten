import logging
from flask              import Flask,request ,jsonify
from server.Calendar    import CalendarAPI ,Calendar ,CalendarEvent
from server.User        import User , Authorization
from server.permission  import ResponsePage ,checkPermission
from server.Actions     import Actions
from tools              import Print,allowed_file
from werkzeug.utils     import secure_filename

app = Flask(__name__)
logging.getLogger('werkzeug').setLevel(logging.WARNING)
app.config['UPLOAD_FOLDER'] = 'static/img'

GUEST         = "GUEST"
ASSISTANCE    = "ASSISTANCE"
KINDERGARTNER = "KINDERGARTNER"
Action = Actions()

calendarAssistant = CalendarEvent("assistant")
calendarEvent     = CalendarEvent("events")

# --pages-----------------------------------------------
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
        comps    = ["header.js","childrenItem.js","addChildren.js"],
        scripts  = ["validation.js"],
        auth     = [ASSISTANCE,KINDERGARTNER],
        sendData = [Action.GetAllChildern()],
    )

@app.route('/assistant',methods=['GET'])
def Assistant():
    return ResponsePage(
        request,
        page         = ["assistant.js"],
        comps        = ["header.js","assistantItem.js","addAssistant.js","freeDay.js","calendarAssistant.js"],
        scripts      = ["validation.js"],
        auth         = [KINDERGARTNER,ASSISTANCE],
        dataByAuth = [
            [KINDERGARTNER,[calendarAssistant.getAllEvents(json=True)]]
        ],
        sendData     = [Action.GetAllAssistans()],
    )
@app.route('/message',methods=['GET'])
def Message():
    return ResponsePage(
        request,
        page         = ["message.js"],
        comps        = ["header.js"],
        scripts      = ["validation.js"],
        auth         = [KINDERGARTNER,ASSISTANCE],
        sendData     = [],
    )

@app.route('/events',methods=['GET'])
def Events():
    return ResponsePage(
        request,
        page         = ["events.js"],
        comps        = ["header.js","calendarEvent.js"],
        scripts      = ["validation.js"],
        auth         = [KINDERGARTNER,ASSISTANCE],
        sendData     = [calendarEvent.getAllEvents(json=True)],
    )

@app.route('/login',methods=['GET'])
def Login():
    return ResponsePage(
        request,
        page     = ["login.js"],
        scripts  = ["validation.js"],
        auth     = [GUEST],
    )


# --login--------------------------------------------------
@app.route('/loginin',methods=['POST'])
def Loginin():
    if checkPermission(["GUEST"],request):
        newToken = User.Login(request.get_json()['email'],request.get_json()['password'])
        if(newToken):
            return jsonify({"status":"200","newToken":newToken})
    return jsonify({"status":"400"})

@app.route('/loginout',methods=['POST'])
def Loginout():
    User.Loginout(request.cookies.get("token"))
    return jsonify({"status":"200"})


# --children--------------------------------------------------
@app.route('/addChildren',methods=['POST'])
def AddChildren():
    if checkPermission(["KINDERGARTNER"],request):
        Action.AddChildern(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

@app.route('/updateChildren',methods=['POST'])
def UpdateChildren():
    if checkPermission(["KINDERGARTNER"],request):
        Action.UpdateChildern(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

@app.route('/removeChildren',methods=['POST'])
def RemoveChildren():
    if checkPermission(["KINDERGARTNER"],request):
        Action.RemoveChildern(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})


# --assistan--------------------------------------------------

@app.route('/addAssistant',methods=['POST'])
def AddAssistant():
    if checkPermission(["KINDERGARTNER"],request):
        Action.AddAssistans(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

@app.route('/updateAssistant',methods=['POST'])
def UpdateAssistant():
    if checkPermission(["KINDERGARTNER"],request):
        Action.UpdateAssistans(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

@app.route('/removeAssistant',methods=['POST'])
def RemoveAssistant():
    if checkPermission(["KINDERGARTNER"],request):
        Action.RemoveAssistans(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})


# --events--------------------------------------------------

@app.route('/allAssistantsEvents',methods=['GET'])
def AllAssistantsEvents():
    if checkPermission(["KINDERGARTNER"],request):
        return jsonify(calendarAssistant.getAllEvents(json=True))
    return jsonify({"status":"401"})


@app.route('/addAssistantsEvents',methods=['POST'])
def AddAssistantsEvents():
    if checkPermission(["KINDERGARTNER"],request):
        eventObj = request.get_json()
        calendarAssistant.addEvent(calendarAssistant.CreateEventObjOfAsistant(summary=eventObj["summery"], description=eventObj["body"],start_date_time=eventObj["start"],end_date_time=eventObj["end"]))
        Action.send_message(request)
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

@app.route('/deleteAssistantsEvents',methods=['POST'])
def DeleteAssistantsEvents():
    if checkPermission(["KINDERGARTNER"],request):
        calendarAssistant.deleteEvent(request.get_json().get("id"))
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

#  -------

@app.route('/allEvents',methods=['GET'])
def AllEvents():
    if checkPermission(["KINDERGARTNER","ASSISTANCE"],request):
        return jsonify(calendarEvent.getAllEvents(json=True))
    return jsonify({"status":"401"})

@app.route('/addEvents',methods=['POST'])
def AddEvents():
    if checkPermission(["KINDERGARTNER"],request):
        eventObj = request.get_json()
        calendarEvent.addEvent(eventObj=calendarEvent.CreateEventObj(summary=eventObj["summery"], description=eventObj["body"],start_date_time=eventObj["start"],end_date_time=eventObj["end"]))
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})

@app.route('/deleteEvents',methods=['POST'])
def DeleteEvents():
    if checkPermission(["KINDERGARTNER"],request):
        calendarEvent.deleteEvent(request.get_json()["id"])
        return jsonify({"status":"200"})
    return jsonify({"status":"401"})


# ----------------------------------------------------

@app.route('/sendMessage',methods=['POST'])
def SendMessage():
    Action.send_message(request)
    return jsonify({"status":"200"})

@app.route('/readMgs',methods=['POST'])
def ReadMgs():
    Action.read_allMessage(request.get_json()["id"])
    return jsonify({"status":"200"})

@app.route('/confirmMgs',methods=['POST'])
def ConfirmMgs():
    Action.confirmMessage(request.get_json()["id"],request.get_json()["isConfirm"])
    return jsonify({"status":"200"})




# ----------------------------------------------------


if __name__ == '__main__':
    app.run(debug=True)
