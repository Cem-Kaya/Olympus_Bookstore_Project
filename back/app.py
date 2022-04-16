import email
import json

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker

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
  amount_sold = request.form['amount_sold']
  price =request.form['price']
  raiting=request.form['raiting']
  author = request.form['author']
  warranty=request.form['warranty']
  distributor_Information =request.form['distributor_Information']
  sale=request.form['sale']
  picture_url0=request.form['picture_url0']
  picture_url1=request.form['picture_url1']
  picture_url2=request.form['picture_url2']

  products__ = Products(name,model,description,edition_number
              ,quantity, amount_sold, price, raiting, warranty, distributor_Information, author, sale,
              picture_url0,picture_url1,picture_url2)

  db.session.add(products__)
  db.session.commit() 

  return render_template('success.html', data= name)  


@app.route('/all_books')
def get_all_books():
  allproducts=Products.query.filter_by().all()
  jsonprd = []

  for pr in allproducts:
    tmp={
      "id": pr.Pid,
      "img": pr.picture_url0,
      "title": pr.name ,
      "author": pr.author,
      "raiting": pr.raiting,      
      "publisher": pr.distributor_Information,
      "price":  pr.price ,    
      "amount_sold": pr.amount_sold ,
      "release_date": str(pr.date),
      "discount": str((1-pr.sale)*100)+"%",
    }
    jsonprd.append(tmp)  
  return json.dumps(jsonprd)
    

@app.route('/login')
def login():
  return render_template('login.html')  


@app.route('/login/submit', methods=['POST'])
def loginsubmit():
  in_email=request.form['email']
  in_pass_hash=request.form['pass_hash']
  ret=Customers.query.filter_by(email=in_email).all()
  if len(ret)!=1:
    return "False"
  else :
    if ret[0].pass_hash != in_pass_hash:
      return "False"
    else: 
      return "True"


@app.route('/deneme')
def deneme():  
  statement = wishes.insert().values(email="123123", Pid=1)
  db.session.execute(statement)
  db.session.commit()
  return "i beg you"      

if __name__ == '__main__':  #python interpreter assigns "__main__" to the file you run
  db.create_all()
  app.run(debug=True)
  


