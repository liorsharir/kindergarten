
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














# import mysql.connector

# class DB:
#     instance = False
    
#     def __init__(self) -> None:
#         self.conn = mysql.connector.connect(
#             host="127.0.0.1", 
#             user="root",
#             password="123123",
#             database="project"
#         )
#         self.connector =  self.conn.cursor()

#     def Query(self, query):
#         cursor = None
#         try:
#             cursor = self.connector.cursor()
#             cursor.execute(query)
            
#             if query.strip().upper().startswith(('INSERT', 'UPDATE', 'DELETE')):
#                 if cursor.rowcount > 0:
#                     return True
#                 else:
#                     return False
#             else:
#                 result = cursor.fetchall()
#                 if result:
#                     return result
#                 else:
#                     return False
#         except BaseException as e:
#             print(e)
#             return False
#         finally:
#             if cursor:
#                 cursor.close()



#     # def Query(self, query):
#     #     try:
#     #         self.connector.execute(query)  
#     #         result = self.connector.fetchall()
#     #         if len(result) == 0:
#     #             result = False
#     #     except BaseException as e:
#     #         print(e)
#     #         result = False
#     #     if result == [] :
#     #         return False
#     #     return result 



#     def close(self):
#         self.connector.close()
#         self.conn.close()


# DB.instance = DB()