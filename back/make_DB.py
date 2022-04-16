import json
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from numpy import product

from DB_init_SQL import * 

 
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'

db=SQLAlchemy(app)

if __name__ =="__main__":
    custs =[]
    custs.append(Customers("cem",123,"a@a.com","mars") )
    custs.append(Customers("BAHA",123,"b@b.com","venus") )
    for cs in custs:
        db.session.add(cs)        
    db.session.commit()

    custs =[]
    custs.append(Products("everything is lies","2017","ogrenci adam calisi uwu", 2
              ,15, 0, 25.6, 1, "pain", "old people", "author", 1, "https://images-na.ssl-images-amazon.com/images/I/91u-yVVUc1L.jpg"
              ,"https://images-na.ssl-images-amazon.com/images/I/91u-yVVUc1L.jpg","https://images-na.ssl-images-amazon.com/images/I/91u-yVVUc1L.jpg"))
    custs.append(Products("ali baba nin evi","2003","ali babanin bir cifligi var ","1" ,5, 11, 99, 2 , "warranty is not included", "distributor_Information by ali baba himself", "ali baba", 1,
              "https://i.ytimg.com/vi/PH90fAuY3YA/maxresdefault.jpg","https://i.ytimg.com/vi/PH90fAuY3YA/maxresdefault.jpg","https://i.ytimg.com/vi/PH90fAuY3YA/maxresdefault.jpg"))
    for cs in custs:
        db.session.add(cs)        
    db.session.commit()

