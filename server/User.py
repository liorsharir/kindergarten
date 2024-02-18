from flask import Request
from enum import Enum
from .database import DB
from Tools import GenerateString

class Authorization(Enum):
    GUEST         = "GUEST"
    ASSISTANCE    = "ASSISTANCE"
    KINDERGARTNER = "KINDERGARTNER"



class User:
    def __init__(self,auth,id,fn,ln,birth,ph,email,gender,avatar="",token="") -> None:
        self.auth       = auth   
        self.id         = id
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
    def toJson(self)        : return f'"user":{{"id":"{self.id}","auth":"{self.auth}","firstName":"{self.firstName}","lastName":"{self.lastName}","name":"{self.getFullName()}","birthday":"{self.birthday}","phone":"{self.phone}","email":"{self.email}","gender":"{self.gender}","avatar":"{self.avatar}","token":"{self.token}"}}'
        
        
        

    @staticmethod
    def getUserByToken(token="null"):
        print(f"token: {token}")
        if(token):
            query = DB.instance.Query(f"SELECT id,firstName,lastName,email,phone,birthday,gender,avatar,auth,token FROM users WHERE token='{token}';",rows=1)
            if(query):
                return User(id=query[0],fn=query[1],ln=query[2],email=query[3],ph=query[4],birth=query[5],gender=query[6],avatar=query[7],auth=query[8],token=token)
        return User.Guest()
        
   
        

    @staticmethod
    def Guest():
        return User("GUEST","-1","GUEST","","","","","","https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png","")
    
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
    
