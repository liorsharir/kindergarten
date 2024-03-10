from flask import Request
from enum import Enum
from .database import DB
from tools import GenerateString

class Authorization(Enum):
    GUEST         = "GUEST"
    ASSISTANCE    = "ASSISTANCE"
    KINDERGARTNER = "KINDERGARTNER"



class User:
    def __init__(self,auth,id,userID,fn,ln,birth,ph,email,gender,avatar="",token="") -> None:
        self.id         = id
        self.userID     = userID
        self.auth       = auth   
        self.firstName  = fn
        self.lastName   = ln
        self.birthday   = birth
        self.phone      = ph   
        self.email      = email   
        self.gender     = gender   
        self.avatar     = avatar   
        self.token      = token   
        self.notifications = 0


    def isAuth(self, Auth:list): 
        if self.auth in Auth :
            return True
        return False

    
    def getFullName(self)   : return f"{self.firstName} {self.lastName}"
    def toJson(self)        : return f'"user":{{"id":"{self.id}","userID":"{self.userID}","auth":"{self.auth}","firstName":"{self.firstName}","lastName":"{self.lastName}","name":"{self.getFullName()}","birthday":"{self.birthday}","phone":"{self.phone}","email":"{self.email}","gender":"{self.gender}","avatar":"{self.avatar}","token":"{self.token}"}}'
        
        
    def changeImage(self,path):
        if(id!="-1"):
            query = DB.instance.Query(f"UPDATE users SET avatar='{path}' WHERE id='{self.id}' LIMIT 1;")
            if(query):
                return True
        return False


    @staticmethod
    def getUserByToken(token="null"):
        print(f"token: {token}")
        if(token and len(token)>10):
            query = DB.instance.Query(f"SELECT id,firstName,lastName,email,phone,birthday,gender,avatar,auth,token,userID FROM users WHERE token='{token}';",rows=1)
            if(query):
                return User(id=query[0],fn=query[1],ln=query[2],email=query[3],ph=query[4],birth=query[5],gender=query[6],avatar=query[7],auth=query[8],token=token,userID=query[10])
        return User.Guest()
        
   
    @staticmethod
    def getUserByID(id="-1"):
        if(id!="-1"):
            query = DB.instance.Query(f"SELECT id,firstName,lastName,email,phone,birthday,gender,avatar,auth,token,userID FROM users WHERE id='{id}';",rows=1)
            if(query):
                return User(id=query[0],fn=query[1],ln=query[2],email=query[3],ph=query[4],birth=query[5],gender=query[6],avatar=query[7],auth=query[8],userID=query[10])
        return User.Guest()
        
   
        
    @staticmethod
    def getFullNameById(userID="-1"):
        return User.getUserByID(userID).getFullName()
        
   
        

    @staticmethod
    def Guest():
        return User("GUEST","-1","-1","GUEST","","","","","","https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png","")
    
    @staticmethod 
    def Login(email,password):
        newToken = GenerateString(14)
        query =  DB.instance.Query(f"SELECT id FROM users WHERE email='{email}' and password='{password}';")
        if(query):
            query2 = DB.instance.Query(f"UPDATE users SET token='{newToken}' WHERE email='{email}' and password='{password}' LIMIT 1;")
            if query2:
                return newToken
        return False

    @staticmethod
    def Loginout(token):
        if(token):
            DB.instance.Query(f"UPDATE users SET token='null' WHERE token='{token}' LIMIT 1;")
        return True
    
    @staticmethod
    def getKINDERGARTNERIDId():
        query =  DB.instance.Query(f"SELECT id FROM users WHERE auth='KINDERGARTNER';")
        return query[0][0]
  