import random
import string

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