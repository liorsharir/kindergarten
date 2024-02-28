from .database import DB 
from .User import User 
from Tools import createJsonByQueryResult 

class Actions:
    def GetAllChildern(self):
        children = DB.instance.Query(f"SELECT id,firstName,lastName,birthday,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,medicalInfo,gender From children;")
        json = '"children":['
        if(children) :
            for item in children:   json += f'{{"id":"{item[0]}","firstName":"{item[1]}","lastName":"{item[2]}","name":"{item[1]} {item[2]}","birthday":"{item[3]}","motherName":"{item[4]}","motherEmail":"{item[5]}","motherPhone":"{item[6]}","fatherName":"{item[7]}","fatherEmail":"{item[8]}","fatherPhone":"{item[9]}","medicalInfo":"{item[10]}","gender":"{item[11]}"}}'
        json += ']'
        return json
        
    def AddChildern(self,data):
        query = DB.instance.Query(f"INSERT INTO children (id,firstName,lastName,birthday,gender,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,MedicalInfo,image) VALUES ('{data['childId']}','{data['firstName']}','{data['lastName']}','{data['birthday']}','{data['gender']}','{data['name_mom']}','{data['mail_mom']}','{data['phone_mom']}','{data['name_dad']}','{data['mail_dad']}','{data['phone_dad']}','{data['MedicalData']}','{data['childImg']}');")
        if query: return True
        else    : return False
    
    def RemoveChildern(self,data):
        query = DB.instance.Query(f"DELETE FROM children WHERE id='{data['childId']}';")
        if query: return True
        else    : return False
    
    def UpdateChildern(self,data):
        query = DB.instance.Query(f"UPDATE children SET firstName='{data['firstName']}', lastName='{data['lastName']}', birthday='{data['birthday']}',gender='{data['gender']}', motherName='{data['name_mom']}', motherEmail='{data['mail_mom']}', motherPhone='{data['phone_mom']}', fatherName='{data['name_dad']}', fatherEmail='{data['mail_dad']}', fatherPhone='{data['phone_dad']}', MedicalInfo='{data['MedicalData']}', image='{data['childImg']}' WHERE id='{data['childId']}' LIMIT 1 ;")
        if query: return True
        else    : return False
    
    
    def GetAllAssistans(self):
        assitans =  DB.instance.Query(f"SELECT id,firstName,lastName,birthday,avatar,auth,phone,email From users WHERE auth='ASSISTANCE';")
        json = '"assistants":['
        if(assitans) :
            for item in assitans:   json += f'{{"id":"{item[0]}","firstName":"{item[1]}","lastName":"{item[2]}","name":"{item[1]} {item[2]}","birthday":"{item[3]}","avatar":"{item[4]}","auth":"{item[5]}","phone":"{item[6]}","email":"{item[7]}"}}'
        json += ']'
        return json
    

    def AddAssistans(self,data):
        query = DB.instance.Query(f"INSERT INTO users (id,firstName,lastName,password,email,birthday,gender,avatar,auth) VALUES ('{data['assistantId']}','{data['firstName']}','{data['lastName']}','{data['password']}','{data['email']}','{data['birthday']}','{data['gender']}','{data['avatar']}','ASSISTANCE');")
        if query: return True
        else    : return False
        
        
    def RemoveAssistans(self,data):
        query = DB.instance.Query(f"DELETE FROM users WHERE id='{data['assistantId']}' and auth='ASSISTANCE';")
        if query: return True
        else    : return False
        
        
    def UpdateAssistans(self,data):
        query = DB.instance.Query(f"UPDATE users SET id='{data['assistantId']}',firstName='{data['firstName']}',lastName='{data['lastName']}',password='{data['password']}',email='{data['email']}',birthday='{data['birthday']}',gender='{data['gender']}',avatar='{data['avatar']}' WHERE id='{data['assistantId']}' LIMIT 1 ;")
        if query: return True
        else    : return False
        
    def getAllEvents(self):
        pass
    def AddEvent(self):
        pass
    def RemoveEvent(self):
        pass
    def UpdateEvent(self):
        pass
    
    
    def SendToMail(self,context , mails:list):
        pass
    
    
    
    
    