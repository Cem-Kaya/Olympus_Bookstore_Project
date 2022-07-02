# Authored by Cem Kaya & Baha Mert Ersoy

import json
from sys import hash_info
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import requests as req
from DB_init_SQL import * 
import crypto_funcs 

 
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'

db=SQLAlchemy(app)

if __name__ =="__main__":   
   
    statement = manages.insert().values(Pmid=1, Pid=17)
    db.session.execute(statement)
    db.session.commit() 

    statement = change_price.insert().values(Sid=1, Pid=17)
    db.session.execute(statement)
    db.session.commit() 

    statement = manages.insert().values(Pmid=1, Pid=18)
    db.session.execute(statement)
    db.session.commit() 

    statement = change_price.insert().values(Sid=1, Pid=18)
    db.session.execute(statement)
    db.session.commit() 