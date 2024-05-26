from sqlite3 import connect, Row, Connection

def open_db() -> Connection:
    conn = connect('db.sqlite')
    conn.execute('CREATE TABLE IF NOT EXISTS directors(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
    conn.execute('CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, directorId INTEGER, FOREIGN KEY(directorId) REFERENCES directors(id))')
    return conn