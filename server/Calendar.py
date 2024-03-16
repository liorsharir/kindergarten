from google.oauth2 import service_account
from googleapiclient.discovery import build
import datetime
from .database import DB 

class CalendarAPI:
    def __init__(self):
        self.credentials = service_account.Credentials.from_service_account_file("credentials.json", scopes=['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.events'])
        self.service = build('calendar','v3',credentials=self.credentials)



class Calendar(CalendarAPI):
    def __init__(self):
        CalendarAPI.__init__(self)

    def create(self, calendar):
        created_calendar = self.service.calendars().insert(body=calendar).execute()
        return created_calendar['id']

    def delete(self, calendar_id):
        self.service.calendars().delete(calendarId=calendar_id).execute()
    def getAllcalendars(self):
        calendars_result = self.service.calendarList().list().execute()
        calendars = calendars_result.get('items', [])
        if not calendars:    
            print('No calendars found.')
            return None
        return calendars

    def getCalendarById(self,id):
        for x in self.getAllcalendars():
           if(x["id"] == id):
               return x
        return None


class CalendarEvent(CalendarAPI):
    def __init__(self,type):
        CalendarAPI.__init__(self)
        self.calendarsID = {
            "assistant": "1b114cab90ad5b53436a5ea0a26fe9c3ca66910bd8eaea010091a519a8069cd6@group.calendar.google.com",
            "events"   : "a18f2344f242b6d972791ee0150fdeb142c65bb5a580ac959c10e344d1f5b889@group.calendar.google.com"
        }
        if(self.calendarsID.get(type)==None):
            print("the type of calanfar not good")
            return
        self.calendar_id = self.calendarsID[type]


    def getAllEvents(self, json=False):
        events_result = self.service.events().list(calendarId=self.calendar_id, singleEvents=True,orderBy='startTime').execute()
        events = events_result.get('items', [])
        result = []
        if not events:
            if(json):
                return ',"events":[]'
            return None
        else:
            for i in range(len(events)):
                result.append({
                    "id"            : events[i]["id"],
                    "summary"       : events[i]["summary"],
                    "start"         : self.unmargDate(events[i]["start"]["dateTime"]),
                    "end"           : self.unmargDate(events[i]["end"]["dateTime"]),
                    "description"   : events[i]["description"]
                })
        if(json):
            Json = ',"events":['
            for item in result:
                Json += f'{{"id":"{item["id"]}","summary": "{item["summary"]}","start":{{"fullYear":"{item["start"]["fullYear"]}","fullHour":"{item["start"]["fullHour"]}","year":"{item["start"]["year"]}","mon":"{item["start"]["mon"]}","day":"{item["start"]["day"]}","hour":"{item["start"]["hour"]}","min":"{item["start"]["min"]}","sec":"{item["start"]["sec"]}"}},"end":{{"fullYear":"{item["end"]["fullYear"]}","fullHour":"{item["end"]["fullHour"]}","year":"{item["end"]["year"]}","mon":"{item["end"]["mon"]}","day":"{item["end"]["day"]}","hour":"{item["end"]["hour"]}","min":"{item["end"]["min"]}","sec":"{item["end"]["sec"]}"}},"description":"{item["description"]}"}}'
            Json += ']'
            return Json

        return result

    def getEventsByDate(self,start,end,json=False):
        start_date = datetime.datetime.strptime(start, "%Y-%m-%d").isoformat() + 'Z' 
        end_date = datetime.datetime.strptime(end, "%Y-%m-%d").isoformat() + 'Z'
        events_result = self.service.events().list(calendarId=self.calendar_id, timeMin=start_date, timeMax=end_date).execute()
        events = events_result.get('items', [])
        result = []
        if not events:
            if(json):
                return ',"events":[]'
            return None
        else:
            for i in range(len(events)):
                result.append({
                    "id"            : events[i]["id"],
                    "summary"       : events[i]["summary"],
                    "start"         : self.unmargDate(events[i]["start"]["dateTime"]),
                    "end"           : self.unmargDate(events[i]["end"]["dateTime"]),
                    "description"   : events[i]["description"]
                })
            if(json):
                Json = ',"events":['
                for item in result:
                    Json += f'{{"id":"{item["id"]}","summary": "{item["summary"]}","start":{{"fullYear":"{item["start"]["fullYear"]}","fullHour":"{item["start"]["fullHour"]}","year":"{item["start"]["year"]}","mon":"{item["start"]["mon"]}","day":"{item["start"]["day"]}","hour":"{item["start"]["hour"]}","min":"{item["start"]["min"]}","sec":"{item["start"]["sec"]}"}},"end":{{"fullYear":"{item["end"]["fullYear"]}","fullHour":"{item["end"]["fullHour"]}","year":"{item["end"]["year"]}","mon":"{item["end"]["mon"]}","day":"{item["end"]["day"]}","hour":"{item["end"]["hour"]}","min":"{item["end"]["min"]}","sec":"{item["end"]["sec"]}"}},"description":"{item["description"]}"}}'
                Json += ']'
                return Json
        return result

    
    def addEvent(self, eventObj):
        event_result = self.service.events().insert(calendarId=self.calendar_id, body=eventObj).execute()
        print('Event created: %s' % (event_result.get('htmlLink')))
        return event_result['id']

    def updateEvent(self, event_id, eventObj):
        updated_event = self.service.events().update(calendarId=self.calendar_id, eventId=event_id, body=eventObj).execute()
        print('Event updated: %s' % (updated_event.get('htmlLink')))

    def deleteEvent(self, event_id):
        self.service.events().delete(calendarId=self.calendar_id, eventId=event_id).execute()
        print('Event deleted.')
        
    def deleteAllEvents(self):
        events = self.getAllEvents()
        if(events):
            for e in events:
                self.service.events().delete(calendarId=self.calendar_id,eventId=e["id"]).execute()
                print('Event deleted.')


    def CreateEventObjOfAsistant(self,summary, start_date_time, end_date_time, location=None, description=None, attendees=None, reminders=None, recurrence=None, time_zone='Asia/Jerusalem'):
        # allEmails = DB.instance.Query("select email From users")
        # print(allEmails)
        event = {
            'summary': summary,
            'location': location if location else 'לא צוין מיקום',
            'description': description if description else 'לא צוינה תיאור',
            'start': {
                'dateTime': start_date_time,
                'timeZone': time_zone,
            },
            'end': {
                'dateTime': end_date_time,
                'timeZone': time_zone,
            },
            'recurrence': recurrence if recurrence else [],
            'attendees': attendees if attendees else [],
            'reminders': {
                'useDefault': False,
                'overrides': reminders if reminders else [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        }
        return event
    

    def CreateEventObj(self,summary, start_date_time, end_date_time, location=None, description=None, attendees=None, reminders=None, recurrence=None, time_zone='Asia/Jerusalem'):
        # allEmails = DB.instance.Query("(SELECT email AS email FROM users) UNION (SELECT fatherEmail AS email FROM children) UNION (SELECT motherEmail AS email FROM children)")
        # attendees = [{'email': email[0]} for email in allEmails]

        event = {
            'summary': summary,
            'location': location if location else 'לא צוין מיקום',
            'description': description if description else 'לא צוינה תיאור',
            'start': {
                'dateTime': start_date_time,
                'timeZone': time_zone,
            },
            'end': {
                'dateTime': end_date_time,
                'timeZone': time_zone,
            },
            'recurrence': recurrence if recurrence else [],
            'attendees': attendees if attendees else [],
            'reminders': {
                'useDefault': False,
                'overrides': reminders if reminders else [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        }
        return event

    def margeDate(self,day,mon,year,hour='00',min="00",sec=""):
        return f"{year}-{mon}-{day}T{hour}:{min}:{sec}+02:00"
    def unmargDate(self,date):
        return {
            "fullYear":date[0:10],
            "fullHour":date[11:19],
            "year"  :date[0:4],
            "mon"   :date[5:7],
            "day"   :date[8:10],
            "hour"  :date[11:13],
            "min"   :date[14:16],
            "sec"   :date[17:19],
        } 
    
