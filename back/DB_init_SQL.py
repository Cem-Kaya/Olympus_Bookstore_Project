from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.sql import func
#from sqlalchemy.ext.declarative import declarative_base


# ONE SHELL MAKE DB BEFORE INITign IT  ! 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'

db=SQLAlchemy(app)


#entities 

#table'dan sonraki siralar: table'in adi, columnlar, column adi degeri ve aldigi deger
#customer_product = db.Table('customer_product',
  #db.Column('Cid', db.Integer, db.ForeignKey('Customers.cid')),
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
#)

under = db.Table('under',
  db.Column('Pcid', db.Integer, db.ForeignKey('Product_Category.Pcid')),
  db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
)

wishes = db.Table('wishes',
  db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid')),
  db.Column('date', db.DateTime(timezone=True), server_default=func.now())
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
)

shopping_cart = db.Table('shopping_cart',
  db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid')),
  db.Column('date', db.DateTime(timezone=True), server_default=func.now()),
  db.Column('quantity', db.Integer)

)


change_price = db.Table('change_price',
  db.Column('Sid', db.Integer, db.ForeignKey('Sales_Manager.Sid')),
  db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
)

manages = db.Table('manages',
  db.Column('Pmid', db.Integer, db.ForeignKey('Product_Manager.Pmid')),
  db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
)

approval = db.Table('approval',
  db.Column('Pmid', db.Integer, db.ForeignKey('Product_Manager.Pmid')),
  db.Column('cid', db.Integer, db.ForeignKey('Comment.cid')),
  db.Column('approved', db.Boolean)
)

manages_category = db.Table('manages_category',
  db.Column('Pmid', db.Integer, db.ForeignKey('Product_Manager.Pmid')),
  db.Column('Pcid', db.Integer, db.ForeignKey('Product_Category.Pcid'))
)

#refunds = db.Table('wishes',
 # db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid')),
  #db.Column('Sid', db.Integer, db.ForeignKey('Sales_Manager.Sid')),
  #db.Column('date', db.DateTime(timezone=True), server_default=func.now()),
  #db.Column('refund',  db.String(100))
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))
#)


class Refunds(db.Model): 
  __tablename__ = "Refunds"
  id = db.Column(db.Integer, primary_key=True)
  customer_email = db.Column(db.String(100), db.ForeignKey('Customers.email'), nullable = False)
  purchased_purcid = db.Column(db.Integer, db.ForeignKey('Purchased.purcid'), nullable=False)
  sales_manager_id = db.Column(db.Integer, db.ForeignKey('Sales_Manager.Sid'), nullable = False)
  date = db.Column(db.DateTime(timezone=True), server_default=func.now())
  refund_state = db.Column('refund',  db.String(100))

  __table_args__ = (db.UniqueConstraint(customer_email, purchased_purcid, sales_manager_id),)
  Customers = db.relationship("Customers", back_populates="Refunds")
  Purchased = db.relationship("Purchased")
  Sales_Manager = db.relationship("Sales_Manager", back_populates="Refunds")
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))

class Comments(db.Model): 
  __tablename__ = "Comments"
  comid = db.Column(db.Integer, primary_key=True, autoincrement = True)
  customer_email = db.Column(db.String(100), db.ForeignKey('Customers.email'), nullable = False)
  product_pid = db.Column(db.Integer, db.ForeignKey('Products.Pid'), nullable=False)
  comment_id = db.Column(db.Integer, db.ForeignKey('Comment.cid'), nullable = False)
  date = db.Column(db.DateTime(timezone=True), server_default=func.now())

  __table_args__ = (db.UniqueConstraint(customer_email, product_pid, comment_id),)
  Customers = db.relationship("Customers", back_populates="Comments")
  Products = db.relationship("Products")
  Comment = db.relationship("Comment", back_populates="Comments")
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))



class Buy_Dlist(db.Model):
  __tablename__ = "Buy_Dlist"
  delivery_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  did = db.Column(db.Integer)
  quantity = db.Column(db.Integer)
  customer_email = db.Column(db.String(100), db.ForeignKey('Customers.email'), nullable = False)
  product_pid = db.Column(db.Integer, db.ForeignKey('Products.Pid'), nullable=False)
  purchased_purcid = db.Column(db.Integer, db.ForeignKey('Purchased.purcid'), nullable=False)
  date = db.Column(db.DateTime(timezone=True), server_default=func.now())

  __table_args__ = (db.UniqueConstraint(customer_email, product_pid, purchased_purcid),)
  Customers = db.relationship("Customers", back_populates="Buy_Dlist")
  Products = db.relationship("Products")
  Purchased = db.relationship("Purchased", back_populates="Buy_Dlist")
  #db.Column('email', db.String(100), db.ForeignKey('Customers.email')),
  #db.Column('name', db.String(100), db.ForeignKey('Customers.name')),
  #db.Column('Pid', db.Integer, db.ForeignKey('Products.Pid'))



class Customers(db.Model):
  __tablename__='Customers'
  #Cid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  pass_hash=db.Column(db.String(512))
  email=db.Column(db.String(100), primary_key=True)
  tax_id=db.Column(db.String(100))
  homeadress=db.Column(db.String(100))
  wishes = db.relationship('Products', secondary = wishes, backref = 'wish')
  shopping_cart_= db.relationship('Products', secondary = shopping_cart, backref = 'carts')
  Refunds =  db.relationship("Refunds", back_populates="Customers")
  Comments = db.relationship("Comments", back_populates="Customers")
  Buy_Dlist = db.relationship("Buy_Dlist", back_populates="Customers")
  #bought_products = db.relationship('Products', secondary = customer_product, backref = 'owned')

  def __init__(self,name,pass_hash,email,homeadress, tax_id= "customer tax id not set "):
    self.name=name
    self.pass_hash=pass_hash
    self.email=email
    self.homeadress=homeadress
    self.tax_id=tax_id

class Products(db.Model):
  __tablename__='Products'
  Pid=db.Column(db.Integer,primary_key=True, autoincrement=True )
  name=db.Column(db.String(1000))
  model=db.Column(db.String(500)) 
  description=db.Column(db.String(10000))
  edition_number=db.Column(db.Integer)
  quantity =db.Column(db.Integer)
  amount_sold=db.Column(db.Integer)
  price =db.Column(db.Integer)
  raiting = db.Column(db.REAL) 
  warranty=db.Column(db.String(10000))
  distributor_Information =db.Column(db.String(10000))
  author=db.Column(db.String(10000))
  sale=db.Column(db.REAL)
  picture_url0=db.Column(db.String(10000))
  picture_url1=db.Column(db.String(10000))
  picture_url2=db.Column(db.String(10000))
  date =  db.Column(db.String(1000))
  deleted = db.Column(db.Boolean)




  def __init__(self,name,model,description,edition_number
              ,quantity, amount_sold, price, raiting, warranty, distributor_Information, author, sale,
              picture_url0,picture_url1,picture_url2, deleted = False):
    self.name=name
    self.model=model
    self.description=description
    self.edition_number=edition_number
    self.quantity=quantity
    self.amount_sold=amount_sold
    self.price=price
    self.raiting=raiting
    self.warranty=warranty
    self.distributor_Information=distributor_Information
    self.author=author
    self.sale=sale
    self.picture_url0=picture_url0
    self.picture_url1=picture_url1
    self.picture_url2=picture_url2
    self.sale=sale
    self.date = str(datetime.now()) 
    self.deleted = deleted

    

class Product_Category(db.Model):
  __tablename__='Product_Category'
  Pcid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  under_ = db.relationship('Products', secondary = under, backref = 'pcid')

  def __init__(self,name):
    self.name=name


class Product_Manager(db.Model):
  __tablename__='Product_Manager'
  Pmid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  pass_hash=db.Column(db.String(512))
  manages_= db.relationship('Products', secondary = manages, backref = 'manage')
  approval_ = db.relationship('Comment', secondary = approval, backref = 'approve')
  manages_category_= db.relationship('Product_Category', secondary = manages_category, backref = 'manages')

  def __init__(self,name, pass_hash):
    self.name=name
    self.pass_hash=pass_hash

class Sales_Manager(db.Model):
  __tablename__='Sales_Manager'
  Sid=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  pass_hash=db.Column(db.String(512))
  change_price_= db.relationship('Products', secondary = change_price, backref = 'chan_price')
  Refunds =  db.relationship("Refunds", back_populates="Sales_Manager")
 

  def __init__(self,name, pass_hash):
    self.name=name
    self.pass_hash=pass_hash

class Purchased(db.Model):
  __tablename__='Purchased'
  purcid=db.Column(db.Integer,primary_key=True)
  price=db.Column(db.Integer)
  sale=db.Column(db.REAL)
  quantity=db.Column(db.Integer)
  shipment=db.Column(db.String(100))
  Buy_Dlist = db.relationship("Buy_Dlist", back_populates="Purchased")


  def __init__(self,price, sale, quantity, shipment):
    self.price = price
    self.sale = sale
    self.quantity = quantity
    self.shipment = shipment
    
class Comment(db.Model):
  __tablename__='Comment'
  cid=db.Column(db.Integer,primary_key=True)
  text=db.Column(db.String(2500))
  stars=db.Column(db.Integer)
  Comments = db.relationship("Comments", back_populates="Comment")
  

  def __init__(self,text,stars):
    self.text=text
    self.stars=stars
    


















if __name__ == '__main__':  #python interpreter assigns "__main__" to the file you run
  db.create_all()
  


