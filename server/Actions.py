from .database import DB 
from .User import User 

class Action:
    @staticmethod
    def GetAllChildern():
        children = DB.instance.Query(f"SELECT id,firstName,lastName,birthday,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone From children;")
        json = '"children":['
        if(children) :
            for item in children:   json += f'{{"id":"{item[0]}","firstName":"{item[1]}","lastName":"{item[2]}","name":"{item[1]} {item[2]}","birthday":"{item[3]}","motherName":"{item[4]}","motherEmail":"{item[5]}","motherPhone":"{item[6]}","fatherName":"{item[7]}","fatherEmail":"{item[8]}","fatherPhone":"{item[9]}",}}'
        json += ']'
        return json
        
    @staticmethod
    def AddChildern(data):
        query = DB.instance.Query(f"INSERT INTO children (`id`,`firstName`,`lastName`,`birthday`,`motherName`,`motherEmail`,`motherPhone`,`fatherName`,`fatherEmail`,`fatherPhone`,`MedicalInfo`,`image`) VALUE ('{data['childId']}','{data['firstName']}','{data['lastName']}','{data['birthday']}','{data['name_mom']}','{data['mail_mom']}','{data['phone_mom']}','{data['name_dad']}','{data['mail_dad']}','{data['phone_dad']}','{data['MedicalData']}','{data['childImg']}');")
        if query: return True
        else    : return False
    
    @staticmethod
    def RemoveChildern(data):
        query = DB.instance.Query(f"DELETE FROM children WHERE id='{data['childId']}';")
        if query: return True
        else    : return False
    
    @staticmethod 
    def UpdateChildern(data):
        query = DB.instance.Query(f"UPDATE users SET firstName='{data['firstName']}', lastName='{data['lastName']}', birthday='{data['birthday']}', motherName='{data['name_mom']}', motherEmail='{data['mail_mom']}', motherPhone='{data['phone_mom']}', fatherName='{data['name_dad']}', fatherEmail='{data['mail_dad']}', fatherPhone='{data['phone_dad']}', MedicalInfo='{data['MedicalData']}', image='{data['childImg']}' WHERE id='{data['childId']}' LIMIT 1 ;")
        if query: return True
        else    : return False
    
    
    
    @staticmethod
    def GetAllAssitans():
        assitans =  DB.instance.Query(f"SELECT id,firstName,lastName,birthday,avatar,auth,phone,email From users WHERE auth='ASSISTANCE';")
        json = '"assistants":['
        if(assitans) :
            for item in assitans:   json += f'{{"id":"{item[0]}","firstName":"{item[1]}","lastName":"{item[2]}","name":"{item[1]} {item[2]}","birthday":"{item[3]}","avatar":"{item[4]}","auth":"{item[5]}","phone":"{item[6]}","email":"{item[7]}"}}'
        json += ']'
        return json
    
    @staticmethod
    def AddAssitans():
        pass
    @staticmethod
    def RemoveAssitans():
        pass
    @staticmethod
    def UpdateAssitans():
        pass
    
    
    @staticmethod
    def getAllEvents():
        pass
    @staticmethod
    def AddEvent():
        pass
    @staticmethod
    def RemoveEvent():
        pass
    @staticmethod
    def UpdateEvent():
        pass
    
    
    @staticmethod
    def SendToMail(context , mails:list):
        pass
    
    
    
    
    