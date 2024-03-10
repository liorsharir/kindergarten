
import mysql.connector

class DB:
    instance = False
    
    def __init__(self):
        self.conn = mysql.connector.connect(
            host="127.0.0.1", 
            user="root",
            password="",
            database="project"
        )
        self.cursor = self.conn.cursor(buffered=True)

    def Query(self, query,rows=100):
        try:
            self.cursor.execute(query)
            if query.strip().upper().startswith(('INSERT', 'UPDATE', 'DELETE')):
                self.conn.commit()  
                return self.cursor.rowcount > 0
            else:
                result = self.cursor.fetchall()
                if   result and rows==1  : return result[0]
                elif result              : return result
                else                     : return False 
                
        except BaseException as e:
            print(query)
            print(e)
            return False

    def close(self):
        self.cursor.close()
        self.conn.close()


DB.instance = DB()

