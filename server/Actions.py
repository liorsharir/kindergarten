from .database import DB
from .User import User
from flask import jsonify
from tools import Print,allowed_file
from werkzeug.utils import secure_filename
import os


class Actions:
    def GetAllChildern(self):
        children = DB.instance.Query(f"SELECT id,firstName,lastName,birthday,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,medicalInfo,gender,image,childID From children;")
        json = '"children":['
        if(children) :
            for item in children:   json += f'{{"id":"{item[0]}","firstName":"{item[1]}","lastName":"{item[2]}","name":"{item[1]} {item[2]}","birthday":"{item[3]}","motherName":"{item[4]}","motherEmail":"{item[5]}","motherPhone":"{item[6]}","fatherName":"{item[7]}","fatherEmail":"{item[8]}","fatherPhone":"{item[9]}","medicalInfo":"{item[10]}","gender":"{item[11]}","image":"{item[12]}","childID":"{item[13]}"}}'
        json += ']'
        return json

    def GetAllAssistans(self):
        assitans =  DB.instance.Query(f"SELECT id,firstName,lastName,birthday,avatar,auth,phone,email,userID,phone From users WHERE auth='ASSISTANCE';")
        json = '"assistants":['
        if(assitans) :
            for item in assitans:   json += f'{{"id":"{item[0]}","firstName":"{item[1]}","lastName":"{item[2]}","name":"{item[1]} {item[2]}","birthday":"{item[3]}","avatar":"{item[4]}","auth":"{item[5]}","phone":"{item[6]}","email":"{item[7]}","userID":"{item[8]}","phone":"{item[9]}"}}'
        json += ']'
        return json

    def AddChildern(self,request):
        data = request.form
        query = DB.instance.Query(f"INSERT INTO children (childID,firstName,lastName,birthday,gender,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,MedicalInfo,image) VALUES ('{data.get('childID')}','{data.get('firstName')}','{data.get('lastName')}','{data.get('birthday')}','{data.get('gender')}','{data.get('name_mom')}','{data.get('mail_mom')}','{data.get('phone_mom')}','{data.get('name_dad')}','{data.get('mail_dad')}','{data.get('phone_dad')}','{data.get('MedicalData')}','{self.UploadImgChild(request)}');")
        if query: return True
        else    : return False

    def AddAssistans(self,request):
        data = request.form
        query = DB.instance.Query(f"INSERT INTO users (phone,firstName,lastName,password,email,birthday,gender,auth,userID,avatar) VALUES ('{data.get('phone')}','{data.get('firstName')}','{data.get('lastName')}','{data.get('password')}','{data.get('email')}','{data.get('birthday')}','{data.get('gender')}','ASSISTANCE','{data.get('userID')}','{self.UploadImgAsistant(request)}');")
        if query: return True
        else    : return False

    def UpdateChildern(self,request):
        data = request.form
        temp = f"image='{self.UploadImgAsistant(request)}'," if('image' in request.files) else " "
        query = DB.instance.Query(f"UPDATE children SET {temp} childID='{data.get('childID')}', firstName='{data.get('firstName')}', lastName='{data.get('lastName')}', birthday='{data.get('birthday')}',gender='{data.get('gender')}', motherName='{data.get('name_mom')}', motherEmail='{data.get('mail_mom')}', motherPhone='{data.get('phone_mom')}', fatherName='{data.get('name_dad')}', fatherEmail='{data.get('mail_dad')}', fatherPhone='{data.get('phone_dad')}', MedicalInfo='{data.get('MedicalData')}' WHERE id='{data.get('id')}' LIMIT 1 ;")
        if query: return True
        else    : return False

    def UpdateAssistans(self,request):
        data= request.form
        temp = f"avatar='{self.UploadImgAsistant(request)}'," if('image' in request.files) else ""
        query = DB.instance.Query(f"UPDATE users SET {temp} userID='{data.get('userID')}',phone='{data.get('phone')}',firstName='{data.get('firstName')}',lastName='{data.get('lastName')}',password='{data.get('password')}',email='{data.get('email')}',birthday='{data.get('birthday')}',gender='{data.get('gender')}' WHERE id='{data.get('id')}' LIMIT 1 ;")
        if query: return True
        else    : return False


    def RemoveChildern(self,request):
        data= request.get_json()
        query = DB.instance.Query(f"DELETE FROM children WHERE id='{data['id']}';")
        if query: return True
        else    : return False

    def RemoveAssistans(self,request):
        data= request.get_json()
        query = DB.instance.Query(f"DELETE FROM users WHERE id='{data['id']}' and auth='ASSISTANCE';")
        if query: return True
        else    : return False



    def getAllMessageById(self,id):
        messages =  DB.instance.Query(f"SELECT id,fromID,toID,confirm,body,isRead,date,start,end From messages fromName WHERE  fromID='{id}' or toID='{id}'")
        json = '"messages":['
        if(messages) :
            for item in messages:
                fromName = User.getFullNameById(item[1])
                toName   = User.getFullNameById(item[2])
                json += f'{{"fromName":"{fromName}","toName":"{toName}","id":"{item[0]}","from":"{item[1]}","to":"{item[2]}","confirm":"{item[3]}","body":"{item[4]}","read":"{item[5]}","date":"{item[6]}","start":"{item[6]}","end":"{item[7]}"}}'
        json += '],'
        return json

    def send_message(self, request):
        data= request.get_json()
        query = DB.instance.Query(f"INSERT INTO messages (fromID,toID,body,start,end) VALUES ('{data.get('fromID')}','{data.get('toID')}','{data.get('body')}','{data.get('start')}','{data.get('end')}');")
        if query: return True
        else    : return False

    def confirm_message(self ,msgId, confirm):
        query = DB.instance.Query(f"UPDATE messages SET  isRead='1', confirm='{confirm}' WHERE id='{msgId}' LIMIT 1 ;")
        if query: return True
        else    : return False

    def read_message(self ,msgId):
        query = DB.instance.Query(f"UPDATE messages SET isRead='1' WHERE id='{msgId}' LIMIT 1 ;")
        if query: return True
        else    : return False

    # def read_allMessage(self ,userId):
    #     query = DB.instance.Query(f"UPDATE messages SET isRead='1' WHERE toID='{userId}';")
    #     if query: return True
    #     else    : return False

    def confirmMessage(self ,msgId,isConfirm):
        query = DB.instance.Query(f"UPDATE messages SET  isRead='1' , confirm='{isConfirm}' WHERE id='{msgId}';")
        if query: return True
        else    : return False



    def changeChildren(self ,chidID,path):
        query = DB.instance.Query(f"UPDATE children SET image='{path}' WHERE id='{chidID}' LIMIT 1 ;")
        if query: return True
        else    : return False



    def UploadImgAsistant(self,request):
        if 'image' not in request.files:
            return "static/img/genericAssistant.png"
        file = request.files['image']
        if file.filename == '':
            return "not good"
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_path = os.path.join('static/img/', filename)
            file.save(save_path)
            return(save_path)

    def UploadImgChild(self,request):
        if 'image' not in request.files:
            return "static/img/genericChild.png"
        file = request.files['image']
        if file.filename == '':
            return "not good"
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_path = os.path.join('static/img/', filename)
            file.save(save_path)
            return(save_path)
    
   