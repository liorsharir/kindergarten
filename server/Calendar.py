from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from datetime import datetime, timedelta

class Calandar:
    def __init__(self):
        self.SCOPES = ['https://www.googleapis.com/auth/calendar']
        self.flow = InstalledAppFlow.from_client_secrets_file('credentials.json', self.SCOPES)
        self.creds = self.flow .run_local_server(port=0)
        self.service = build('calendar', 'v3', credentials=self.creds)


    def getFromCalendar(self):
        pass

    def insertToCalendar(self,id,event={}):
        event = self.service.events().insert(calendarId=id, body=event).execute()
        print('Event created: %s' % (event.get('htmlLink')))


    def uptateCalendar(self):
        pass
    def removeCalendar(self):
        pass
    