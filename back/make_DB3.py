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
   
    x = datetime(int(2022), int(1), 1)
    db.session.query(Refunds)\
            .filter(Refunds.id == 1)\
            .update({Refunds.date: x })
    db.session.commit()
    
    x = datetime(int(2022), int(1), 1)
    db.session.query(Buy_Dlist)\
            .filter(Buy_Dlist.did == 1)\
            .update({Buy_Dlist.date: x })
    db.session.commit()