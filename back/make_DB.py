
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

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
