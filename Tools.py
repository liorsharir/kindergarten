import random
import string
import json

def margeJson(list:list):
    json ='{'
    for item in list:
        json += item
    json+='}'
    json = json.replace("}{", "},{")        
    json = json.replace('}"', '},"')        
    json = json.replace(',}', '}')        
    return json  

def GenerateString(size = 10):
    chars=string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(size))


def createJsonByQueryResult(key="", dict={}):
      json = f'"{key}":['




def Print(text):
    print(type(text))
    if(type(text) == list):
        with open("temp.json", "w") as outfile:
            json.dump(text, outfile)
    print(text)
    
def allowed_file(filename,ALLOWED_EXTENSIONS ={'png', 'jpg', 'jpeg'}):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
