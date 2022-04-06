from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy


# ONE SHELL MAKE DB BEFORE INITign IT  ! 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'

db=SQLAlchemy(app)


#entities 
class Customer(db.Model):
  __tablename__='Customers'
  Cid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  pass_hash=db.Column(db.String(512))
  email=db.Column(db.String(100))
  homeadress=db.Column(db.String(100))

  def __init__(self,name,pass_hash,email,homeadress):
    self.name=name
    self.pass_hash=pass_hash
    self.email=email
    self.homeadress=homeadress

class Product(db.Model):
  __tablename__='Products'
  Pid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  model=db.Column(db.String(50))
  description=db.Column(db.String(1000))
  edition_number=db.Column(db.Integer  )
  quantity =db.Column(db.Integer)
  price =db.Column(db.Integer )
  warranty=db.Column(db.String(1000))
  distributor_Information =db.Column(db.String(1000))
  sale=db.Column(db.Real )

  def __init__(self,name,model,description,edition_number,quantity,price,warranty,distributor_Information,sale):
    self.name=name
    self.model=model
    self.description=description
    self.edition_number=edition_number
    self.quantity=quantity
    self.price=price
    self.warranty=warranty
    self.distributor_Information=distributor_Information
    self.sale=sale

    

class Product_Category(db.Model):
  __tablename__='Product_Category'
  Pcid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))

  def __init__(self,name):
    self.name=name


class Product_Manager(db.Model):
  __tablename__='Product_Manager'
  Pmid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  pass_hash=db.Column(db.String(512))

  def __init__(self,name, pass_hash):
    self.name=name
    self.pass_hash=pass_hash

class Sales_Manager(db.Model):
  __tablename__='Sales Manager'
  Sid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  pass_hash=db.Column(db.String(512))

  def __init__(self,name, pass_hash):
    self.name=name
    self.pass_hash=pass_hash

class Purchased(db.Model):
  __tablename__='Purchased'
  purcid=db.Column(db.Integer,primary_key=True)
  price=db.Column(db.Integer)
  sale=db.Column(db.Real)
  quantity=db.Column(db.Integer)
  shipment=db.Column(db.String(100))

  def __init__(self,price, sale, quantity, shipment):
    self.price = price
    self.sale = sale
    self.quantity = quantity
    self.shipment = shipment
    
class Comment(db.Model):
  __tablename__='Comment'
  cid=db.Column(db.Integer,primary_key=True)
  text=db.Column(db.String(250))
  

  def __init__(self,text):
    self.text=text
    


















if __name__ == '__main__':  #python interpreter assigns "__main__" to the file you run
  db.create_all()
  


