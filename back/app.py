import imp
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

from DB_init_SQL import * 

 
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'

db=SQLAlchemy(app)


@app.route('/')
def index():
  return render_template('index.html')

@app.route('/signup')
def signup():
  return render_template('signup.html')  



@app.route('/signup/submit', methods=['POST'])
def signupsubmit():
  
  name= request.form['name']
  pass_hash=request.form['pass_hash']
  email=request.form['email']
  homeadress=request.form['homeadress']



  

  custumer__= Customers(name,pass_hash,email,homeadress)
  db.session.add(custumer__)
  db.session.commit()

  #fetch a certain student2
  custumer__=db.session.query(Customers)
  
  print(custumer__)

  return render_template('success.html', data= name)


@app.route('/Products_reg')
def Products_reg():
  return render_template('Products_reg.html')
            
@app.route('/Products_reg/submit', methods=['POST'])
def Prsubmit():
  
  name=request.form['name']
  model=request.form['model']
  description=request.form['description']
  edition_number=request.form['edition_number']
  quantity =request.form['quantity']
  price =request.form['price']
  warranty=request.form['warranty']
  distributor_Information =request.form['distributor_Information']
  sale=request.form['sale']


  

  products__ = Products(name,model,description,edition_number, quantity, price, warranty, distributor_Information, sale)
  db.session.add(products__)
  db.session.commit()

  #fetch a certain student2
  products__=db.session.query(Products)
  
  print(products__)

  return render_template('success.html', data= name)  


if __name__ == '__main__':  #python interpreter assigns "__main__" to the file you run
  db.create_all()
  app.run(debug=True)
  


