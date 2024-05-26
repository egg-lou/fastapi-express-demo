from sqlite3 import connect, Row, Connection

# For MySQL
# from mysql.connector import connect as mysql_connect, Error

def open_db() -> Connection:
    conn = connect('db.sqlite')
    conn.execute('CREATE TABLE IF NOT EXISTS directors(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
    conn.execute('CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, directorId INTEGER, FOREIGN KEY(directorId) REFERENCES directors(id))')
    return conn

# For MySQL
# def open_db():
#     try:
#         conn = connect(
#             host="localhost",
#             user="XXXX",
#             password="",
#             database="XXXXXX"
#         )
#         cursor = conn.cursor()
#         cursor.execute("""
#             CREATE TABLE IF NOT EXISTS directors (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 name TEXT
#             )
#         """)
#         cursor.execute("""
#             CREATE TABLE IF NOT EXISTS movies (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 title TEXT,
#                 directorId INTEGER,
#                 FOREIGN KEY(directorId) REFERENCES directors(id)
#             )
#         """)
#     except Error as e:
#         print(e)