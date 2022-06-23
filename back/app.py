
import threading
import json
from time import strptime
import requests as req
from flask_cors import CORS
from flask import Flask, render_template, request, send_from_directory, send_file
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import null

from sqlalchemy.orm import sessionmaker
from urllib3 import Retry

from DB_init_SQL import * 
from test_email import *
 
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'
app.config['SQLALCHEMY_MAX_OVERFLOW']= -1 
app.config['SQLALCHEMY_POOL_TIMEOUT']= 120 


db=SQLAlchemy(app)






@app.route('/')
def index():
  return render_template('index.html')

@app.route('/customer_info')  
def customerinfo():
  return render_template('customer_info.html') 

@app.route('/customer_info/submit_test', methods=['POST'], strict_slashes=False  )
def customerinfotest():
  url = 'http://127.0.0.1:5000/customer_info/submit'
  myobj = {'email': request.form['email']  
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/customer_info/submit', methods=['POST'],  strict_slashes=False)
def customerinfosubmit():
  
  data2 = json.loads(request.get_data())
  print(request.get_data())
  email= data2['email']


  retjs ={}
  if len(Customers.query.filter_by(email=email).all())==0:
    retjs["status"] = False
    retjs["uid"] = None
  else:    
    myCustomer = Customers.query.filter_by(email=email).first()
    retjs["status"] = True
    retjs["uid"] = email
    retjs["name"] = myCustomer.name
    retjs["pass_hash"] = myCustomer.pass_hash
    retjs["homeaddress"] = myCustomer.homeadress
    retjs["tax_id"] = myCustomer.tax_id

  return json.dumps(retjs)


@app.route('/super_secret_all_tables_panel')
def alltables():
  todata = "<h2> ENTITIES</h2>"
  todata +="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> <th> tax_id </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.name, i.tax_id, i.pass_hash) 
  todata +="</table>   "

  todata+="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> <th>quantity</th> <th>amount_sold</th>  <th>deleted</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td><td> {} </td><td> {} </td> <td> {} </td></tr>".format(i.Pid,i.name,i.price,i.sale,i.quantity,i.amount_sold, i.deleted) 
  todata +="</table>"

  todata+="<h3> Product Category </h3> "
  allproductscats=Product_Category.query.filter_by().all()
  todata+= "<table> <tr> <th>pcid </th> <th>name </th> </tr> "
  for i in allproductscats:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.name) 
  todata +="</table>   "

  todata+="<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  allPurchased=Purchased.query.filter_by().all()
  todata+=" <h3> Purchased </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>purcid </th> <th> price </th> <th>sale</th> <th>quantity</th><th>shipment</th> </tr> '
  for i in allPurchased:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.purcid,i.price,i.sale,i.quantity,i.shipment) 
  todata +="</table>"

  todata+= "<h3> Comment </h3>"
  todata+= "<table> <tr> <th> cid </th> <th> stars </th><th> text </th></tr> "
  allComments = db.session.query(Comment).all()  # db.session.query(followers).filter(...).all()
  for i in allComments:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.cid, i.stars ,i.text) 
  todata +="</table>   "

  todata+= "<h2> RELATIONSHIPS </h2>"

  todata+= "<h3> Under </h3>"
  todata+= "<table> <tr> <th> Pcid </th> <th> Pid </th> </tr> "
  allUnders = db.session.query(under).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.Pid) 
  todata +="</table>   "

  todata+= "<h3> change_price  </h3>"
  todata+= "<table> <tr> <th> Sid </th> <th> Pid </th> </tr> "
  allUnders = db.session.query(change_price).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid, i.Pid) 
  todata +="</table>   "

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> email </th><th> pid </th><th> Quantity </th><th> Purcid </th><th> Date </th></tr> "
  allShoppingCarts = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email,i.product_pid,i.quantity,i.purchased_purcid, i.date ) 
  todata +="</table> "  

  todata+= "<h3> Manages  </h3>"
  todata+= "<table> <tr><th> Pmid </th> <th> Pid </th>  </tr> "
  allUnders = db.session.query(manages).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.Pid) 
  todata +="</table>   "
  

  todata+= "<h3> Approval </h3>"
  todata+= "<table> <tr> <th> Pmid </th> <th> cid </th><th> approved </th></tr> "
  allCommentapp = db.session.query(approval).all()  # db.session.query(followers).filter(...).all()
  for i in allCommentapp:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.cid, i.approved) 
  todata +="</table>   "

  todata+= "<h3> Refunds </h3>"
  todata+= "<table> <tr> <th> id </th> <th> customer_email </th><th> purchased_purcid </th><th> sales_manager_id </th><th> refund_state </th><th> date </th></tr> "
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  for i in allrefunds:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.id, i.customer_email, i.purchased_purcid, i.sales_manager_id, i.refund_state, i.date) 
  todata +="</table>   " 

  todata+= "<h3> Manages_category  </h3>"
  todata+= "<table> <tr> <th> Pcid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages_category).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.Pmid) 
  todata +="</table>   "  

  todata+= "<h3> Wishes </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th></tr> "
  allUnders = db.session.query(wishes).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date) 
  todata +="</table>   "

  todata+= "<h3> Shopping_Cart </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th><th> Quantity </th></tr> "
  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date, i.quantity) 
  todata +="</table>   "  

  todata+= "<h3> Comments </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> cid </th><th> date </th></tr> "
  allCommentsR = db.session.query(Comments).all()  # db.session.query(followers).filter(...).all()
  for i in allCommentsR:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.customer_email, i.comment_id, i.product_pid, i.date) 
  todata +="</table>   "  

  return render_template('super_secret_all_tables_panel.html', data=todata)  



@app.route('/signup')
def signup():
  return render_template('signup.html')  

@app.route('/signup/submit_test', methods=['POST'], strict_slashes=False  )
def signupsubmit_test():
  url = 'http://127.0.0.1:5000/signup/submit'
  myobj = {'name': request.form['name'] , 
           'pass_hash': request.form['pass_hash'],
          'email': request.form['email'],
          'homeadress': request.form['homeadress'],
          'tax_id': request.form['tax_id']
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  



@app.route('/signup/submit', methods=['POST'],  strict_slashes=False)
def signupsubmit():
  
  data2 = json.loads(request.get_data())
  print(request.get_data())
  name= data2['name']
  pass_hash=data2['pass_hash']
  email=data2['email']
  homeadress=data2['homeadress']
  tax_id=data2['tax_id']

  retjs ={}
  if len(Customers.query.filter_by(email=email).all())!=0:
    retjs["status"] = False
    retjs["uid"] = None
  else:    
    custumer__= Customers(name,pass_hash,email,homeadress,tax_id)
    db.session.add(custumer__)
    db.session.commit()  
    retjs["status"] = True
    retjs["uid"] = email

  return json.dumps(retjs)




@app.route('/Product_manager_reg')
def Product_manager_reg():
  return render_template('Product_manager_reg.html')  

@app.route('/Product_manager_reg/submit_test', methods=['POST'], strict_slashes=False  )
def Product_manager_regsubmittest():
  url = 'http://127.0.0.1:5000/Product_manager_reg/submit'
  myobj = {'name': request.form['name'] , 
           'pass_hash': request.form['pass_hash'],
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/Product_manager_reg/submit', methods=['POST'], strict_slashes=False)
def Product_manager_regsubmit(): 
  data2 = json.loads(request.get_data())
  print(request.get_data())
  name= data2['name']
  pass_hash=data2['pass_hash']

  PM_ex_check = db.session.query(Product_Manager)\
       .filter(Product_Manager.name == name ).all()
  if len(PM_ex_check) >=1:
    retjs={}
    retjs["status"] = False
    retjs["Pmid"] = None
    return json.dumps(retjs)



  PM__= Product_Manager(name=name,pass_hash=pass_hash)
  db.session.add(PM__)
  db.session.commit()
  retjs ={}
  allproductmanagers = db.session.query(Product_Manager).all()
  pidvalues = []
  if(len(allproductmanagers) == 0):
    pidvalues.append(int(1))
  else:
    for i in allproductmanagers:
      pidvalues.append(i.Pmid)
  maxPmid=max(pidvalues)

  retjs["status"] = True
  retjs["Pmid"] = maxPmid

  return json.dumps(retjs)




@app.route('/Products_reg')
def Products_reg():


  return render_template('Products_reg.html')

@app.route('/Products_reg/submit_test', methods=['POST'], strict_slashes=False  )
def Products_regsubmittest():
  url = 'http://127.0.0.1:5000/Products_reg/submit'
  myobj = {'name': request.form['name'] , 
           'model': request.form['model'],
           'description': request.form['description'],
           'edition_number': request.form['edition_number'],
           'quantity': request.form['quantity'],
           'amount_sold': request.form['amount_sold'],
           'price': request.form['price'],  
           'raiting': request.form['raiting'], 
           'author': request.form['author'], 
           'warranty': request.form['warranty'], 
           'distributor_Information': request.form['distributor_Information'],   
           'sale': request.form['sale'], 
           'picture_url0': request.form['picture_url0'], 
           'picture_url1': request.form['picture_url1'], 
           'picture_url2': request.form['picture_url2'],
           'Pcid': request.form['Pcid'],
           'Sid': request.form['Sid'],
           'Pmid': request.form['Pmid']
           
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )   

@app.route('/Products_reg/submit', methods=['POST'], strict_slashes=False)
def Prsubmit():  

  data2 = json.loads(request.get_data())
  print(request.get_data())
  Pcid = data2['Pcid']
  Sid = data2['Sid']
  Pmid = data2['Pmid']
  name= data2['name']
  model=data2['model']
  description=data2['description']
  edition_number=data2['edition_number']
  quantity= data2['quantity']
  amount_sold=data2['amount_sold']
  price=data2['price']
  raiting=data2['raiting']
  author = data2['author']
  warranty=data2['warranty']
  distributor_Information =data2['distributor_Information']
  sale=data2['sale']
  picture_url0=data2['picture_url0']
  picture_url1=data2['picture_url1']
  picture_url2=data2['picture_url2']

  products__ = Products(name,model,description,edition_number
              ,quantity, amount_sold, price, raiting, warranty, distributor_Information, author, sale,
              picture_url0,picture_url1,picture_url2)

  db.session.add(products__)
  db.session.commit() 
  Pid = products__.Pid

  statement = manages.insert().values(Pmid=Pmid, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()

  statement = change_price.insert().values(Sid=Sid, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()  

  statement = under.insert().values(Pcid=Pcid, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()  
    
  
  retjs ={}
  retjs["status"] = True
  return json.dumps(retjs)



@app.route('/comment_reg')
def comment_reg():
  return render_template('comment_reg.html')

@app.route('/comment_reg/submit_test', methods=['POST'], strict_slashes=False  )
def comment_regsubmittest():
  url = 'http://127.0.0.1:5000/comment_reg/submit'
  myobj = {'text': request.form['text'] , 
           'stars': request.form['stars']
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    
            
@app.route('/comment_reg/submit', methods=['POST'],  strict_slashes=False)
def comment_regsubmit():  
  data2 = json.loads(request.get_data())
  print(request.get_data())
  text=data2['text']
  stars=data2['stars']
  comment__ = Comment(text,stars)
  db.session.add(comment__)
  db.session.commit() 
  retjs ={}
  retjs["status"] = True
  return json.dumps(retjs)
  #return render_template('success.html', data= text ) 




@app.route('/Sales_manager_reg')
def Sales_manager_reg():
  return render_template('Sales_manager_reg.html')  

@app.route('/Sales_manager_reg/submit_test', methods=['POST'], strict_slashes=False  )
def sales_manager_submittest():
  url = 'http://127.0.0.1:5000/Sales_manager_reg/submit'
  myobj = {'name': request.form['name'] , 
           'pass_hash': request.form['pass_hash']
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    
            
@app.route('/Sales_manager_reg/submit', methods=['POST'], strict_slashes=False)
def Sales_manager_regsubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data())
  name= data2['name']
  pass_hash=data2['pass_hash']

  
  sm_ex_check = db.session.query(Sales_Manager)\
       .filter(Sales_Manager.name == name ).all()
  if len(sm_ex_check) >=1:
    retjs={}
    retjs["status"] = False
    retjs["sid"] = None
    return json.dumps(retjs)

  Sales_manager__ = Sales_Manager(name,pass_hash)
  db.session.add(Sales_manager__)
  db.session.commit()
  retjs = {}  
  retjs["status"] = True
  retjs["sid"] = Sales_manager__.Sid
  return json.dumps(retjs)




@app.route('/Product_Catogary_reg')
def Prc():
  return render_template('Product_Catogary_reg.html')  

@app.route('/Product_Catogary/submit_test', methods=['POST'], strict_slashes=False  )
def Prcsubmittest():
  url = 'http://127.0.0.1:5000/Product_Catogary_reg/submit'
  myobj = {'name': request.form['name'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    
            
@app.route('/Product_Catogary_reg/submit', methods=['POST'], strict_slashes=False)
def Prcsubmit():  
  data2 = json.loads(request.get_data())
  print(request.get_data())
  name= data2['name']
  PC__ = Product_Category(name)
  db.session.add(PC__)
  db.session.commit() 
  retjs={}
  retjs["status"] = True
  return json.dumps(retjs)

  #return render_template('success.html', data= name)  

@app.route('/purchased')
def Purchasedd():
  allPurchased=Purchased.query.filter_by().all()
  todata=" <h3> Purchased </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>purcid </th> <th> price </th> <th>sale</th> <th>quantity</th><th>shipment</th> </tr> '
  for i in allPurchased:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.purcid,i.price,i.sale,i.quantity,i.shipment) 
  todata +="</table>"

  return render_template('purchased.html',data=todata)  

@app.route('/get_ones_purch_hist/submit_test' ,strict_slashes=False)
def get_ones_purchsubmit_test():  
  url = 'http://127.0.0.1:5000/get_ones_purch_hist/submit'
  myobj = {'uid': "a@a.com" }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )


@app.route('/get_ones_purch_hist/submit', methods=['POST'], strict_slashes=False)
def get_ones_purchsubmit():  
  data2 = json.loads(request.get_data())
  email=data2["uid"]  
  alldlist=db.session.query(Buy_Dlist)\
       .filter(Buy_Dlist.customer_email == email )
  retjs={}
  #TODO  
  for k , j in  enumerate( alldlist):
    retjs[k]= { "pid" : j.product_pid , "date":str(j.date ), "quantity": j.quantity , "purcid": j.purchased_purcid , 
      "sale": (b:=db.session.query(Purchased).filter(Purchased.purcid == j.purchased_purcid ).first()).sale, "price":b.price,
      "shipment":b.shipment
     }
  return json.dumps(retjs )
  


@app.route('/get_all_purch_hist', strict_slashes=False)
def get_all_purchsubmit():  

  alldlist=db.session.query(Buy_Dlist)\
       .filter( )
  retjslist=[]
  #TODO  
  for k , j in  enumerate( alldlist):
    retjslist.append( { "pid" : j.product_pid , "date":str(j.date ), "quantity": j.quantity , "purcid": j.purchased_purcid , 
      "sale": (b:=db.session.query(Purchased).filter(Purchased.purcid == (t:=j.purchased_purcid) ).first()).sale, "price":b.price,
      "shipment":b.shipment,
      "email":j.customer_email, 
      "name": (q:=Products.query.filter_by(Pid=j.product_pid  ).first()).name,
      "url": q.picture_url0
     })
  return json.dumps(retjslist )







@app.route('/purchased/submit_test' ,methods=['POST'], strict_slashes=False)
def purchasedsubmittest():  
  url = 'http://127.0.0.1:5000/purchased/submit'
  myobj = {'price': request.form['price'] , 
           'sale': request.form['sale'],
           'quantity': request.form['quantity'],
           'shipment': request.form['shipment']
           }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )

@app.route('/purchased/submit', methods=['POST'], strict_slashes=False)
def Purchasedsubmit():  
  data2 = json.loads(request.get_data())
  print(request.get_data())
  price=data2['price']
  sale=data2['sale']
  quantity=data2['quantity']
  shipment=data2['shipment']
  PC__ = Purchased(price=price, sale=sale, quantity=quantity,shipment=shipment)
  db.session.add(PC__)
  db.session.commit()
  retjs = {}
  retjs["status"] = True
  return  json.dumps(retjs)
  #return render_template('success.html', data= "")    

@app.route('/get_shoping/submit_test' ,strict_slashes=False)
def get_shopingsubmittest():  
  url = 'http://127.0.0.1:5000/get_shoping/submit'
  myobj = {'uid': "a@a.com" }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )



@app.route('/get_shoping/submit', methods=['POST'],  strict_slashes=False)
def get_shopingsubmit():  
  data2 = json.loads(request.get_data())
  uid = data2["uid"]  
  retjs={}
  allShoppingCarts = db.session.query(shopping_cart)\
       .filter(shopping_cart.c.email == uid  )  # db.session.query(followers).filter(...).all()
  for j,i in enumerate(allShoppingCarts):
    retjs[j]={"Pid":i.Pid , "quantity":i.quantity  
    ,"name": (q:=Products.query.filter_by(Pid=i.Pid ).first()).name ,
      "url": q.picture_url0 , 
       "price": q.price 
    }    
  return json.dumps(retjs)
      
       



@app.route('/all_books')
def get_all_books():
  allproducts=Products.query.filter_by().all()
  jsonprd = []

  for pr in allproducts:
    if (pr.deleted == False):
      tmp={
        "id": pr.Pid,
        "img": pr.picture_url0,
        "img1": pr.picture_url1,
        "img2": pr.picture_url2,
        "title": pr.name ,
        "author": pr.author,
        "raiting": pr.raiting,      
        "publisher": pr.distributor_Information,
        "price":  pr.price ,    
        "amount_sold": pr.amount_sold ,
        "release_date": str(pr.date),
        "model": pr.model,
        "edition_number": pr.edition_number,
        "description": pr.description,
        "in_stock": pr.quantity,
        "warranty": pr.warranty,
        "discount": str((1-pr.sale)*100)+"%",
        "date": pr.date
      }
      jsonprd.append(tmp)  
  return json.dumps(jsonprd)

@app.route('/all_salesmanagers')
def get_all_salesmanagers():
  allproducts=Sales_Manager.query.filter_by().all()
  jsonprd = []

  for pr in allproducts:
    tmp={
      "Sid": pr.Sid,
      "name": pr.name
     
    }
    jsonprd.append(tmp)  
  return json.dumps(jsonprd)  

#getting product for pmid
@app.route('/deleted_products_pmid')
def deleted_products_pmid():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  todata+= "<h3> Manages  </h3>"
  todata+= "<table> <tr> <th> Pid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pid,i.Pmid) 
  todata +="</table>   "
  return render_template('deleted_products_pmid.html',data =todata )  

@app.route('/deleted_products_pmid/submit_test', methods=['POST'], strict_slashes=False  )
def deleted_products_pmid_submit_test():
  url = 'http://127.0.0.1:5000/deleted_products_pmid/submit'
  myobj = {"Pmid": request.form['Pmid']   }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/deleted_products_pmid/submit', methods=['POST'] , strict_slashes=False)
def deleted_products_pmid_submit():
  data2 = json.loads(request.get_data())
  Pmid = data2['Pmid']
  allUnders = db.session.query(manages).filter(manages.c.Pmid == Pmid ).all()  # db.session.query(followers).filter(...).all()
 
  ret_js=[]
  for i in allUnders:
    product = Products.query.filter_by(Pid=i.Pid).first()
    if(product.deleted==True):
      tmp={
        "id": product.Pid,
        "img": product.picture_url0,
        "img1": product.picture_url1,
        "img2": product.picture_url2,
        "title": product.name ,
        "author": product.author,
        "raiting": product.raiting,      
        "publisher": product.distributor_Information,
        "price":  product.price ,    
        "amount_sold": product.amount_sold ,
        "release_date": str(product.date),
        "model": product.model,
        "edition_number": product.edition_number,
        "description": product.description,
        "in_stock": product.quantity,
        "warranty": product.warranty,
        "discount": str((1-product.sale)*100)+"%",
        "date": str(product.date)
      }
      ret_js.append(tmp)
  return json.dumps(ret_js)

@app.route('/all_deletedproducts')
def get_all_deletedproducts():
  allproducts=Products.query.filter_by().all()
  jsonprd = []

  for pr in allproducts:
    if(pr.deleted==True):
      tmp={
        "id": pr.Pid,
        "img": pr.picture_url0,
        "img1": pr.picture_url1,
        "img2": pr.picture_url2,
        "title": pr.name ,
        "author": pr.author,
        "raiting": pr.raiting,      
        "publisher": pr.distributor_Information,
        "price":  pr.price ,    
        "amount_sold": pr.amount_sold ,
        "release_date": str(pr.date),
        "model": pr.model,
        "edition_number": pr.edition_number,
        "description": pr.description,
        "in_stock": pr.quantity,
        "warranty": pr.warranty,
        "discount": str((1-pr.sale)*100)+"%",
        "date": pr.date
      }
      jsonprd.append(tmp)  
  return json.dumps(jsonprd)  
  
@app.route('/pmid_deliverylist')
def pmid_deliverylist():
  todata="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> customer_email </th><th> product_pid </th><th> purchased_purcid </th><th> quantity </th><th> date </th></tr> "
  allbuydlist = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allbuydlist:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email, i.product_pid, i.purchased_purcid, i.quantity, i.date) 
  todata +="</table>   "
  return render_template('pmid_deliverylist.html',data =todata )  
  
@app.route('/pmid_deliverylist/submit_test',methods=['POST'] ,strict_slashes=False)
def pmid_deliverylistsubmittest():  
  url = 'http://127.0.0.1:5000/pmid_deliverylist/submit'
  myobj = {'Pmid': request.form['Pmid'] }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )   


  

@app.route('/pmid_deliverylist/submit', methods=['POST'] , strict_slashes=False )
def pmid_deliverylistsubmit():
 
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 

  Pmid= int(data2['Pmid'])
  #sales_manager_id= int(data2['sid'])
  jsonprd = []
  #getting pid
  allManages = db.session.query(manages).all()
  allDlist = db.session.query(Buy_Dlist).all()
  for i in allDlist:
    my_user = Customers.query.filter_by(email=i.customer_email).first()
    my_purchased = Purchased.query.filter_by(purcid=i.purchased_purcid).first()
    for j in allManages:
      if(j.Pid == i.product_pid): #when the pid of the item in delivery list is in manages relationship
        if(j.Pmid == Pmid): #and our product manager is responsible for it.
          pr =  db.session.query(Products).filter(Products.Pid == i.product_pid ).first()
          tmp={
            "did": i.did,
            "Pid": i.product_pid,
            "email": i.customer_email,
            "address": my_user.homeadress,
            "purcid": i.purchased_purcid,
            "img": pr.picture_url0,
            "title": pr.name ,
            "author": pr.author,
            "raiting": pr.raiting,      
            "publisher": pr.distributor_Information,
            "item price":  pr.price ,    
            "total price":  pr.price* my_purchased.quantity,    
            "shipment": my_purchased.shipment,
            "quantity": my_purchased.quantity,
            "amount_sold": pr.amount_sold ,
            "release_date": str(pr.date),
            "model": pr.model,
            "edition_number": pr.edition_number,
            "description": pr.description,
            "in_stock": pr.quantity,
            "warranty": pr.warranty,
            "discount": str((1-pr.sale)*100)+"%",
            "date": str(i.date)
          }
          jsonprd.append(tmp)  
  if(len(jsonprd) == 0):
    retjs={}
    retjs["status"] = False
    return json.dumps(retjs)

  return json.dumps(jsonprd)


    #retjs = {}
    #retjs["status"] = False
    #return json.dumps(retjs)


##############################################################################################################################


@app.route('/sid_deliverylist')
def sid_deliverylist():
  todata="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> customer_email </th><th> product_pid </th><th> purchased_purcid </th><th> quantity </th><th> date </th></tr> "
  allbuydlist = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allbuydlist:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email, i.product_pid, i.purchased_purcid, i.quantity, i.date) 
  todata +="</table>   "
  return render_template('sid_deliverylist.html',data =todata )  
  
@app.route('/sid_deliverylist/submit_test',methods=['POST'] ,strict_slashes=False)
def sid_deliverylistsubmittest():  
  url = 'http://127.0.0.1:5000/sid_deliverylist/submit'
  myobj = {'Sid': request.form['Sid'] }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text ) 


@app.route('/sid_deliverylist/submit', methods=['POST'] , strict_slashes=False )
def sid_deliverylistsubmit():
 
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 
  Sid= int(data2['Sid'])
  #sales_manager_id= int(data2['sid'])
  jsonprd = []
  #getting pid
  all_sid_products = db.session.query(change_price).all()
  allDlist = db.session.query(Buy_Dlist).all()
  for i in allDlist:
    my_user = Customers.query.filter_by(email=i.customer_email).first()
    my_purchased = Purchased.query.filter_by(purcid=i.purchased_purcid).first()
    for j in all_sid_products:
      if(j.Pid == i.product_pid): #when the pid of the item in delivery list is in manages relationship
        if(j.Sid == Sid): #and our product manager is responsible for it.
          pr =  db.session.query(Products).filter(Products.Pid == i.product_pid ).first()
          tmp={
            "did": i.did,
            "Pid": i.product_pid,
            "email": i.customer_email,
            "address": my_user.homeadress,
            "purcid": i.purchased_purcid,
            "img": pr.picture_url0,
            "title": pr.name ,
            "author": pr.author,
            "raiting": pr.raiting,      
            "publisher": pr.distributor_Information,
            "item price":  pr.price ,    
            "total price":  pr.price* my_purchased.quantity,    
            "shipment": my_purchased.shipment,
            "quantity": my_purchased.quantity,
            "amount_sold": pr.amount_sold ,
            "release_date": str(pr.date),
            "model": pr.model,
            "edition_number": pr.edition_number,
            "description": pr.description,
            "in_stock": pr.quantity,
            "warranty": pr.warranty,
            "discount": str((1-pr.sale)*100)+"%",
            "date": str(i.date)
          }
          jsonprd.append(tmp)  
  if(len(jsonprd) == 0):
    retjs={}
    retjs["status"] = False
    return json.dumps(retjs)

  return json.dumps(jsonprd)


##############################################################################################################################
###############################################################################################################################

##############################################################################################################################


@app.route('/sid_deliverylist_date')
def sid_deliverylist_date():
  todata="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> customer_email </th><th> product_pid </th><th> purchased_purcid </th><th> quantity </th><th> date </th></tr> "
  allbuydlist = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allbuydlist:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email, i.product_pid, i.purchased_purcid, i.quantity, i.date) 
  todata +="</table>   "
  return render_template('sid_deliverylist_date.html',data =todata )  
  
@app.route('/sid_deliverylist_date/submit_test',methods=['POST'] ,strict_slashes=False)
def sid_deliverylistsubmittest_date():  
  url = 'http://127.0.0.1:5000/sid_deliverylist_date/submit'
  myobj = {'Sid': request.form['Sid'],
           "start_date": request.form['start_date'],
           "end_date": request.form['end_date']}
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text ) 


@app.route('/sid_deliverylist_date/submit', methods=['POST'] , strict_slashes=False )
def sid_deliverylist_datesubmit_date():
 
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 
  Sid= int(data2['Sid'])
  start_date = str(data2['start_date'])
  end_date = str(data2['end_date'])
  #sales_manager_id= int(data2['sid'])
  jsonprd = []
  #getting pid
  all_sid_products = db.session.query(change_price).all()
  allDlist = db.session.query(Buy_Dlist).all()
  for i in allDlist:
    my_user = Customers.query.filter_by(email=i.customer_email).first()
    my_purchased = Purchased.query.filter_by(purcid=i.purchased_purcid).first()
    my_start_date = datetime.strptime(start_date, '%Y-%m-%d').date()  
    my_end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
    for j in all_sid_products:
      if(j.Pid == i.product_pid and my_start_date <= i.date.date() <= my_end_date  ): #when the pid of the item in delivery list is in manages relationship
        if(j.Sid == Sid): #and our product manager is responsible for it.
          pr =  db.session.query(Products).filter(Products.Pid == i.product_pid ).first()
          tmp={
            "did": i.did,
            "Pid": i.product_pid,
            "email": i.customer_email,
            "address": my_user.homeadress,
            "purcid": i.purchased_purcid,
            "img": pr.picture_url0,
            "title": pr.name ,
            "author": pr.author,
            "raiting": pr.raiting,      
            "publisher": pr.distributor_Information,
            "item price":  pr.price ,    
            "total price":  pr.price* my_purchased.quantity,    
            "shipment": my_purchased.shipment,
            "quantity": my_purchased.quantity,
            "amount_sold": pr.amount_sold ,
            "release_date": str(pr.date),
            "model": pr.model,
            "edition_number": pr.edition_number,
            "description": pr.description,
            "in_stock": pr.quantity,
            "warranty": pr.warranty,
            "discount": str((1-pr.sale)*100)+"%",
            "date": str(i.date)
          }
          jsonprd.append(tmp)  
  if(len(jsonprd) == 0):
    retjs={}
    retjs["status"] = False
    return json.dumps(retjs)

  return json.dumps(jsonprd)
###################################################################################


@app.route('/sid_deliverylist_date_pdf')
def sid_deliverylist_date_pdf():
  todata="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> customer_email </th><th> product_pid </th><th> purchased_purcid </th><th> quantity </th><th> date </th></tr> "
  allbuydlist = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allbuydlist:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email, i.product_pid, i.purchased_purcid, i.quantity, i.date) 
  todata +="</table>   "
  return render_template('sid_deliverylist_date_pdf.html',data =todata )  
  

def pdf_del(func):
  def hook():
    in_pdfname = str(time.time())
    func()
    #delte pdf 
    os.remove("./pdfs/"+in_pdfname +".pdf")


@app.route('/sid_deliverylist_date_pdf/submit', methods=['POST'] , strict_slashes=False )
def sid_deliverylist_datesubmit_date_pdf():
  try:
    data2 = json.loads(request.get_data())#request.get_json()
    #, strict_slashes=False 
    Sid = int(data2['Sid'])
    start_date = str(data2['start_date'])
    end_date = str(data2['end_date'])
  except:
    Sid = int(request.form['Sid'])
    start_date = str(request.form['start_date'])
    end_date = str(request.form['end_date'] )
  
  #sales_manager_id= int(data2['sid'])
  jsonprd = []
  #getting pid
  all_sid_products = db.session.query(change_price).all()
  allDlist = db.session.query(Buy_Dlist).all()
  text = "Delivery list for selected dates\n\n\n\n\n\n"
  for i in allDlist:
    my_user = Customers.query.filter_by(email=i.customer_email).first()
    my_purchased = Purchased.query.filter_by(purcid=i.purchased_purcid).first()
    my_start_date = datetime.strptime(start_date, '%Y-%m-%d').date()  
    my_end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
    
    for j in all_sid_products:
      if(j.Pid == i.product_pid and my_start_date <= i.date.date() <= my_end_date  ): #when the pid of the item in delivery list is in manages relationship
        if(j.Sid == Sid): #and our product manager is responsible for it.
          pr =  db.session.query(Products).filter(Products.Pid == i.product_pid ).first()
          
          text += "Delivery list id: " + str(i.did)
          text +="\n\n Pid of product:  " + str(i.product_pid)
          text +="\n user email:  " + str(i.customer_email)
          text +="\n user address:  " + str(my_user.homeadress)
          text +="\n purchased product purcid:  " + str(i.purchased_purcid)
          text +="\n title:  " + str(pr.name)
          text +="\n author:  "+ str(pr.author)
          text +="\n rating:  "+ str(pr.raiting)     
          text +="\n publisher:  "+ str( pr.distributor_Information)
          text +="\n item price:  "+  str( pr.price)     
          text +="\n total price:  "+  str( pr.price* my_purchased.quantity)   
          text +="\n shipment:  "+ str( my_purchased.shipment)
          text +="\n quantity:  "+ str( my_purchased.quantity)
          text +="\n amount_sold:  "+ str( pr.quantity) 
          text +="\n model:  "+ str( pr.model)
          text +="\n edition_number:  "+ str( pr.edition_number)
          text +="\n description:  "+ str( pr.description)
          text +="\n in_stock:  "+ str( pr.quantity)
          text +="\n warranty:  "+str(  pr.warranty)
          text +="\n discount:  "+ str((1-my_purchased.sale)*100)+ "%"
          text +="\n date:  "+ str(i.date)  
          text +="\n  \n \n ##################################################################### \n \n \n"
  
  pdf = FPDF()
  pdf.add_page()
  pdf.set_font("Times", size = 14)
  pdf.cell(200, 10, txt = "INVOICE", ln = 1, align = 'C')
  # add another cell
  pdf.multi_cell(150 , 10, txt = text ,border = 1, align = 'C'  )
  pdf_directory_input = str(time.time())
  pdf_name ="./pdfs/"+ pdf_directory_input + ".pdf" #buraya date ile verecegiz isim
  
  
  pdf.output(pdf_name )  
  with open(pdf_name , "rb" ) as f :
    data = f.read()
    #print(data)
  #return data 
  
  #os.remove(pdf_name)  
  #return send_file('pdfs\\1655905702.5361164.pdf' , "1655905702.5361164.pdf")
  #path = 'pdfs\\' + str(t) + '.pdf', str(t)+ ".pdf"
  #print(path)
  return send_file('pdfs\\' + pdf_directory_input + '.pdf', pdf_directory_input+ ".pdf")
  #return send_file('W/Sabanci_Univ/Sabanci_Uni/4_1/CS_308/Projects/Project/team04-cp22-bb/back/pdfs/', attachment_filename=str(t)+ ".pdf")
  #return send_from_directory(directory='./pdfs/', filename=str(time.time())+ ".pdf", path = pdf_name, as_attachment=True)
    
  



@app.route('/all_books_ranged')
def all_books_rangedd():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  return render_template('all_books_ranged.html',data =todata )  #bunu degistirdim


@app.route('/all_books_ranged/submit', methods=['POST'], strict_slashes=False )
def get_all_books_ranged_sub():
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  min = int ( data2['min'] ) 
  max = int ( data2['max'] ) 

  allproducts=Products.query.filter_by().all()
  jsonprd = []

  for i,pr in enumerate(allproducts):
    if i< min:
      continue  
    if i> max:
      break
    if (pr.deleted == False):
      tmp={
        "id": pr.Pid,
        "img": pr.picture_url0,
        "img1": pr.picture_url1,
        "img2": pr.picture_url2,
        "title": pr.name ,
        "author": pr.author,
        "raiting": pr.raiting,      
        "publisher": pr.distributor_Information,
        "price":  pr.price ,    
        "amount_sold": pr.amount_sold ,
        "release_date": str(pr.date),
        "model": pr.model,
        "edition_number": pr.edition_number,
        "description": pr.description,
        "in_stock": pr.quantity,
        "warranty": pr.warranty,
        "discount": str((1-pr.sale)*100)+"%",
        "date": pr.date
      }
      jsonprd.append(tmp)  
  return json.dumps(jsonprd)






@app.route('/delete_product')
def delete_product():
  todata=""  
  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> <th>quantity</th> <th>amount_sold</th> <th>deleted</th></tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td><td> {} </td><td> {} </td><td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale,i.quantity,i.amount_sold, i.deleted) 
  todata +="</table>"
  return render_template('delete_product.html',data=todata) 

#submit test for delete product
@app.route('/delete_product/submit_test', methods=['POST'], strict_slashes=False  )
def delete_product_submittest():
  url = 'http://127.0.0.1:5000/delete_product/submit'
  myobj = {'Pid': request.form['Pid'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text ) 
  

#change deleted attribute of a product with the given pid  false 
@app.route('/delete_product/submit', methods=['POST'], strict_slashes=False )
def delete_product_submit():
  retjs={}
  data2 = json.loads(request.get_data())
  Pid = int(data2['Pid'])
  db.session.query(Products).filter(Products.Pid == Pid).update({"deleted": True})
  db.session.commit()
  retjs["status"] = True
  return json.dumps(retjs)

@app.route('/undelete_product')
def undelete_product():
  todata=""  
  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> <th>quantity</th> <th>amount_sold</th> <th>deleted</th></tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td><td> {} </td><td> {} </td><td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale,i.quantity,i.amount_sold, i.deleted) 
  todata +="</table>"
  return render_template('undelete_product.html',data=todata) 

#submit test for delete product
@app.route('/undelete_product/submit_test', methods=['POST'], strict_slashes=False  )
def undelete_product_submittest():
  url = 'http://127.0.0.1:5000/undelete_product/submit'
  myobj = {'Pid': request.form['Pid'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text ) 
  

#change deleted attribute of a product with the given pid  false 
@app.route('/undelete_product/submit', methods=['POST'], strict_slashes=False )
def undelete_product_submit():
  retjs={}
  data2 = json.loads(request.get_data())
  Pid = int(data2['Pid'])
  db.session.query(Products).filter(Products.Pid == Pid).update({"deleted": False})
  db.session.commit()
  retjs["status"] = True
  return json.dumps(retjs)
    
  
    

@app.route('/update_book')
def update_book():   
  todata=""  
  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> <th>quantity</th> <th>amount_sold</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td><td> {} </td><td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale,i.quantity,i.amount_sold) 
  todata +="</table>"
  return render_template('update_book.html',data=todata) 
    
@app.route('/update_book/submit' ,methods=['POST'], strict_slashes=False )
def update_book_submit(): 
  retjs={}
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  Pid= data2['Pid']
  name= data2['name']
  description=data2['description']
  quantity= data2['quantity']
  amount_sold=data2['amount_sold']
  price=data2['price']
  sale=data2['sale']
  
  old_sale =  db.session.query(Products)\
       .filter(Products.Pid == Pid ).first().sale

  old_price=  db.session.query(Products)\
       .filter(Products.Pid == Pid ).first().price

  db.session.query(Products)\
       .filter(Products.Pid == Pid )\
       .update({Products.name:name , 
       Products.description  : description  , 
       Products.quantity  : quantity  , 
       Products.amount_sold  :amount_sold   , 
       Products.price  :price   , 
       Products.sale  :sale   })
  try:
    db.session.commit()
  except:
    retjs["status"]=False
    return json.dumps(retjs)
  retjs["status"]=True

  new_sale =  db.session.query(Products)\
       .filter(Products.Pid == Pid ).first().sale
  new_price=  db.session.query(Products)\
       .filter(Products.Pid == Pid ).first().price

  if (new_sale != old_sale) or (new_price != old_price):
    allUnders = db.session.query(wishes).all()
    for w in allUnders:
      if w.Pid == Pid:
        #send email ! 
        try:
          send_email(w.email,"An item in your whish list has been updated take a  look. It has pid  {}".format(Pid))
        except:
          print("email error ")
  
  return json.dumps(retjs)

@app.route('/update_book/submit_test', methods=['POST'], strict_slashes=False  )
def update_booksubmit_test():
  url = 'http://127.0.0.1:5000/update_book/submit'
  myobj = {'Pid': request.form['Pid'] , 
           'name': request.form['name'], 
           'description': request.form['description'] , 
           'quantity': request.form['quantity'], 
           'amount_sold': request.form['amount_sold'] , 
           'price': request.form['price'], 
           'sale': request.form['sale'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  


@app.route('/templates/script.js')
def scriptjs():    
  return render_template("script.js")

@app.route('/templates/form-to-json.js')
def scriptformtojs():    
  return render_template("form-to-json.js")

@app.route('/login')
def login():
  return render_template('login.html')  


@app.route('/login/submit_test', methods=['POST'], strict_slashes=False  )
def loginsubmit_test():
  url = 'http://127.0.0.1:5000/login/submit'
  myobj = {'email': request.form['email'] , 
           'pass_hash': request.form['pass_hash'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )



@app.route('/login/submit', methods=['POST'] , strict_slashes=False )
def loginsubmit():
  data2 = json.loads(request.get_data())#request.get_json()
  print(request.get_data())
  #in_email=request.form['email']
  in_email=data2['email']
  in_pass_hash=data2['pass_hash']
  #in_pass_hash=request.form['pass_hash']
  ret=Customers.query.filter_by(email=in_email).all()
  reterned= {}
  if len(ret)!=1:
    reterned["status"] = False
    reterned["uid"] = False
  else :
    if ret[0].pass_hash != in_pass_hash:
      reterned["status"] = False
      reterned["uid"] = False
    else: 
      reterned["status"] = True
      reterned["uid"] = ret[0].email

  return json.dumps(reterned)

@app.route('/login_productmanager')
def login_productmanager():
  return render_template('login_productmanager.html')  


@app.route('/login_productmanager/submit_test', methods=['POST'], strict_slashes=False  )
def login_productmanager_submit_test():
  url = 'http://127.0.0.1:5000/login_productmanager/submit'
  myobj = {'name': request.form['name'] , 
           'pass_hash': request.form['pass_hash'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )



@app.route('/login_productmanager/submit', methods=['POST'] , strict_slashes=False )
def login_productmanager_submit():
  data2 = json.loads(request.get_data())#request.get_json()
  print(request.get_data())
  #in_email=request.form['email']
  in_name=data2['name']
  in_pass_hash=data2['pass_hash']
  #in_pass_hash=request.form['pass_hash']
  ret=Product_Manager.query.filter_by(name=in_name).all()
  reterned= {}
  if len(ret)!=1:
    reterned["status"] = False
    reterned["Pmid"] = False
  else :
    if ret[0].pass_hash != in_pass_hash:
      reterned["status"] = False
      reterned["Pmid"] = False
    else: 
      reterned["status"] = True
      reterned["Pmid"] = ret[0].Pmid

  return json.dumps(reterned)  

@app.route('/login_salesmanager')
def login_salesmanager():
  return render_template('login_salesmanager.html')  


@app.route('/login_salesmanager/submit_test', methods=['POST'], strict_slashes=False  )
def login_salesmanager_submit_test():
  url = 'http://127.0.0.1:5000/login_salesmanager/submit'
  myobj = {'name': request.form['name'] , 
           'pass_hash': request.form['pass_hash'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )



@app.route('/login_salesmanager/submit', methods=['POST'] , strict_slashes=False )
def login_salesmanager_submit():
  data2 = json.loads(request.get_data())#request.get_json()
  print(request.get_data())
  #in_email=request.form['email']
  in_name=data2['name']
  in_pass_hash=data2['pass_hash']
  #in_pass_hash=request.form['pass_hash']
  ret=Sales_Manager.query.filter_by(name=in_name).all()
  reterned= {}
  if len(ret)!=1:
    reterned["status"] = False
    reterned["Sid"] = False
  else :
    if ret[0].pass_hash != in_pass_hash:
      reterned["status"] = False
      reterned["Sid"] = False
    else: 
      reterned["status"] = True
      reterned["Sid"] = ret[0].Sid

  return json.dumps(reterned)  


@app.route('/deneme')
def deneme():  
  statement = wishes.insert().values(email="a@a.com", Pid=1)
  db.session.execute(statement)
  db.session.commit()
  return "i beg you"      

@app.route('/Under')
def Under():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  
  todata+="<h3> Product Category </h3> "
  allproductscats=Product_Category.query.filter_by().all()
  todata+= "<table> <tr> <th>pcid </th> <th>name </th> </tr> "
  for i in allproductscats:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.name) 
  todata +="</table>   "

  todata+= "<h3> Under </h3>"
  todata+= "<table> <tr> <th> Pcid </th> <th> Pid </th> </tr> "
  allUnders = db.session.query(under).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.Pid) 
  todata +="</table>   "
  return render_template('Under.html',data =todata )  #bunu degistirdim

@app.route('/Under/submit_test', methods=['POST'], strict_slashes=False  )
def undersubmit_test():
  url = 'http://127.0.0.1:5000/Under/submit'
  myobj = {'Pid': request.form['Pid'] , 
           'Pcid': request.form['Pcid'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  

@app.route('/Under/submit', methods=['POST'], strict_slashes=False)
def Undersubmit():

  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  Pid=data2['Pid']
  Pcid=data2['Pcid']
  statement = under.insert().values(Pid=Pid, Pcid=Pcid)
  db.session.execute(statement)
  db.session.commit()
  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)
  #return render_template('success.html', data= "")    


@app.route('/Manages_category')
def Managescategory():
  allproductcateg = Product_Category.query.filter_by().all()
  todata=" <h3> Product_Category </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>Pcid </th> <th> name </th>  </tr> '
  for i in allproductcateg:
    todata += "<tr><td> {} </td> <td> {} </td> </tr>".format(i.Pcid,i.name) 
  todata +="</table>"
  
  todata+="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  todata+= "<h3> Manages_category  </h3>"
  todata+= "<table> <tr> <th> Pcid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages_category).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.Pmid) 
  todata +="</table>   "
  return render_template('Manages_category.html',data =todata )  #bunu degistirdim


@app.route('/Manages_category/submit', methods=['POST'], strict_slashes=False)
def Manages_categorysubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  Pcid=data2['Pcid']  
  Pmid=data2['Pmid']
  statement = manages_category.insert().values(Pmid=Pmid, Pcid=Pcid)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")      

@app.route('/Manages')
def Managesprod():
  allproducts = Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>Pid </th> <th> name </th> <th> price </th> <th> date </th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.date) 
  todata +="</table>"
  
  todata+="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  todata+= "<h3> Manages  </h3>"
  todata+= "<table> <tr> <th> Pid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pid,i.Pmid) 
  todata +="</table>   "
  return render_template('Manages.html',data =todata )  #bunu degistirdim


@app.route('/Manages/submit', methods=['POST'], strict_slashes=False )
def Managessubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data())  
  Pmid=data2['Pmid']  
  Pid=data2['Pid']
  statement = manages.insert().values(Pmid=Pmid, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")     

@app.route('/Change_price')
def changesprice():
  allproducts = Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>Pid </th> <th> name </th> <th> price </th> <th> date </th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.date) 
  todata +="</table>"
  
  todata+="<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  todata+= "<h3> change_price  </h3>"
  todata+= "<table> <tr> <th> Sid </th> <th> Pid </th> </tr> "
  allUnders = db.session.query(change_price).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid, i.Pid) 
  todata +="</table>   "
  return render_template('Change_price.html',data =todata )  #bunu degistirdim

@app.route('/Change_price/submit_test', methods=['POST'], strict_slashes=False  )
def change_price_test():
  url = 'http://127.0.0.1:5000/Change_price/submit'
  myobj = {"Pid": request.form['Pid'],
    "Sid": request.form['Sid'] }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/Change_price/submit', methods=['POST'], strict_slashes=False )
def changespricesubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  Pid=data2['Pid']
  Sid=data2['Sid']
  statement = change_price.insert().values(Sid=Sid, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()
  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)
  return render_template('success.html', data= "")        


@app.route('/Wishes_get_all')
def Wishes_get_all():
  allUnders = db.session.query(wishes).all()  # db.session.query(followers).filter(...).all()
  ret_js=[]
  for i in allUnders:
    ret_js.append(
      { "email": i.email  ,"Pid":i.Pid  , "date":str(i.date ) }
    )
  return json.dumps(ret_js)

@app.route('/Wishes_get_email')
def Wishes_get_email():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Wishes </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th></tr> "
  allUnders = db.session.query(wishes).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date) 
  todata +="</table>   "
  return render_template('Wishes_get_email.html',data =todata )  

@app.route('/Wishes_get_email/submit_test', methods=['POST'], strict_slashes=False  )
def Wishes_get_email_test():
  url = 'http://127.0.0.1:5000/Wishes_get_email/submit'
  myobj = {"email": request.form['email']   }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/Wishes_get_email/submit', methods=['POST'] , strict_slashes=False)
def Wishes_get_email_submit():
  data2 = json.loads(request.get_data())
  email = str( data2['email'])
  allUnders = db.session.query(wishes).filter(wishes.c.email == email ).all()  # db.session.query(followers).filter(...).all()
  ret_js=[]
  for i in allUnders:
    ret_js.append(
      { "email": i.email  ,"Pid":i.Pid  , "date":str(i.date ) }
    )
  return json.dumps(ret_js)




@app.route('/Wishes')
def Wishes():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Wishes </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th></tr> "
  allUnders = db.session.query(wishes).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date) 
  todata +="</table>   "
  return render_template('Wishes.html',data =todata )  

@app.route('/Wishes/submit_test', methods=['POST'], strict_slashes=False  )
def wishessubmit_test():
  url = 'http://127.0.0.1:5000/Wishes/submit'
  myobj = {'email': request.form['email'] ,  'Pid': request.form['Pid']     }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  


@app.route('/Wishes/submit', methods=['POST'], strict_slashes=False )
def Wishessubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  
  Pid=data2['Pid']
  email=data2['email']
  my_wishes = db.session.query(wishes).filter(wishes.c.email == email, wishes.c.Pid == Pid ).all()  # db.session.query(followers).filter(...).all()
  if (len(my_wishes)>0):
    retjs = {}
    retjs["status"] = False
    return json.dumps(retjs)

  try:
    statement = wishes.insert().values(email=email, Pid=Pid)
    db.session.execute(statement)
    db.session.commit()
  except:
    retjs = {}    
    retjs["status"] = False
    return json.dumps(retjs)

  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)
  #return render_template('success.html', data= "")    


###################################

@app.route('/Wishes_rm')
def Wishes_rm():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Wishes </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th></tr> "
  allUnders = db.session.query(wishes).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date) 
  todata +="</table>   "
  return render_template('Wishes_rm.html',data =todata )  



@app.route('/Wishes_rm/submit_test', methods=['POST'], strict_slashes=False  )
def wishessubmit_test_rm():
  url = 'http://127.0.0.1:5000/Wishes_rm/submit'
  myobj = {'email': request.form['email'] ,  'Pid': request.form['Pid']     }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  


@app.route('/Wishes_rm/submit', methods=['POST'], strict_slashes=False )
def Wishes_rmsubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  
  Pid=data2['Pid']
  email=data2['email']
  db.session.query(wishes)\
            .filter(wishes.c.email ==email , wishes.c.Pid ==Pid  )\
            .delete()
  #statement = wishes.insert().values(email=email, Pid=Pid)

  db.session.commit()

  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)


#getting product for pmid
@app.route('/products_pmid')
def products_pmid():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  todata+= "<h3> Manages  </h3>"
  todata+= "<table> <tr> <th> Pid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pid,i.Pmid) 
  todata +="</table>   "
  return render_template('products_pmid.html',data =todata )  

@app.route('/products_pmid/submit_test', methods=['POST'], strict_slashes=False  )
def products_pmid_submit_test():
  url = 'http://127.0.0.1:5000/products_pmid/submit'
  myobj = {"Pmid": request.form['Pmid']   }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/products_pmid/submit', methods=['POST'] , strict_slashes=False)
def products_pmid_submit():
  data2 = json.loads(request.get_data())
  Pmid = data2['Pmid']
  allUnders = db.session.query(manages).filter(manages.c.Pmid == Pmid ).all()  # db.session.query(followers).filter(...).all()
  ret_js=[]
  for i in allUnders:
    ret_js.append(
      { "Pmid": i.Pmid  ,"Pid":i.Pid }
    )
  return json.dumps(ret_js)
  
#products_sid
@app.route('/products_sid')
def products_sid():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+= "<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  todata+="<h3>Change Price </h3> "
  allchange_prince=db.session.query(change_price).all()
  todata+= "<table> <tr> <th>Sid </th> <th>Pid </th> </tr> "
  for i in allchange_prince:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid,i.Pid) 
  todata +="</table>   "
  return render_template('products_sid.html',data =todata )  

@app.route('/products_sid/submit_test', methods=['POST'], strict_slashes=False  )
def products_sid_submit_test():
  url = 'http://127.0.0.1:5000/products_sid/submit'
  myobj = {"Sid": request.form['Sid']   }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    

@app.route('/products_sid/submit', methods=['POST'] , strict_slashes=False)
def products_sid_submit():
  data2 = json.loads(request.get_data())
  Sid = data2['Sid']
  allUnders = db.session.query(change_price).filter(change_price.c.Sid == Sid ).all()  # db.session.query(followers).filter(...).all()
  ret_js=[]
  for i in allUnders:
    ret_js.append(
      { "Sid": i.Sid  ,"Pid":i.Pid }
    )
  return json.dumps(ret_js)  

#Shopping Car

@app.route('/Shopping_Cart')
def Shopping_Cart():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th><th>quantity</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td><td> {} </td></tr>".format(i.Pid,i.name,i.price,i.sale,i.quantity) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Shopping_Cart </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th><th> Quantity </th></tr> "
  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date, i.quantity) 
  todata +="</table>   "
  return render_template('Shopping_Cart.html',data =todata )  

@app.route('/Shopping_Cart/submit_test', methods=['POST'], strict_slashes=False  )
def Shopping_Cartsubmittest():
  url = 'http://127.0.0.1:5000/Shopping_Cart/submit'
  myobj = {'Pid': request.form['Pid'] , 
           'email': request.form['email'],
           'quantity' : request.form['quantity']
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )      



@app.route('/Shopping_Cart/submit', methods=['POST'], strict_slashes=False )
def Shopping_Cartsubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data()) 
  
  Pid= int(data2['Pid']) 
  email=data2['email']
  quantity=int(data2['quantity'])

  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    print(i.email , email , i.email == email)
    print(i.Pid , Pid , i.Pid == Pid)
    if(i.email == email and i.Pid == Pid  ): # i was just testing you, can you compile i'll check
      db.session.query(shopping_cart)\
       .filter(shopping_cart.c.email == email ,shopping_cart.c.Pid == Pid )\
       .update({shopping_cart.c.quantity: shopping_cart.c.quantity + quantity})

      db.session.commit()
      return render_template('success.html', data= "")


  statement = shopping_cart.insert().values(email=email, Pid=Pid, quantity=quantity)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")    

@app.route('/Approval')
def Approval_page():
  allProductManager=Product_Manager.query.filter_by().all()
  todata=" <h3> Product_Manager</h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th> Pmid </th> <th> name </th> <th>pass_hash</th> </tr> '
  for i in allProductManager:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table>"

  todata+= "<h3> Comment </h3>"
  todata+= "<table> <tr> <th> cid </th> <th> stars </th><th> text </th></tr> "
  allComments = db.session.query(Comment).all()  # db.session.query(followers).filter(...).all()
  for i in allComments:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.cid, i.stars ,i.text) 
  todata +="</table>   "
  

  todata+= "<h3> Approval </h3>"
  todata+= "<table> <tr> <th> Pmid </th> <th> cid </th><th> approved </th></tr> "
  allCommentapp = db.session.query(approval).all()  # db.session.query(followers).filter(...).all()
  for i in allCommentapp:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.cid, i.approved) 
  todata +="</table>   "
  return render_template('Approval.html',data =todata )  

@app.route('/Approval/submit_test', methods=['POST'], strict_slashes=False  )
def Approval_pagesubmittest():
  url = 'http://127.0.0.1:5000/Approval/submit'
  myobj = {'Pmid': request.form['Pmid'] , 
           'cid': request.form['cid'],
           'approved' : request.form['approved']
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )      


@app.route('/Approval/submit', methods=['POST'], strict_slashes=False )
def Approval_pagesubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data())   
  Pmid= int(data2['Pmid']) 
  cid=data2['cid']
  approved=bool(data2['approved'])

  statement = approval.insert().values(Pmid=Pmid, cid=cid, approved=approved)
  db.session.execute(statement)
  db.session.commit()
  return json.dumps({"status":True })

 


@app.route('/Comments')
def Commentss_page():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Comment </h3>"
  todata+= "<table> <tr> <th> cid </th> <th> stars </th><th> text </th></tr> "
  allComments = db.session.query(Comment).all()  # db.session.query(followers).filter(...).all()
  for i in allComments:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.cid, i.stars ,i.text) 
  todata +="</table>   "

  todata+= "<h3> Comments </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> cid </th><th> date </th></tr> "
  allCommentsR = db.session.query(Comments).all()  # db.session.query(followers).filter(...).all()
  for i in allCommentsR:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.customer_email, i.product_pid, i.comment_id, i.date) 
  todata +="</table>   "
  return render_template('Comments.html',data =todata )  

@app.route('/Comment_all_/submit', methods=['POST'], strict_slashes=False )
def Comment_all_ssubmit():
  data2 = json.loads(request.get_data())
  text=data2['text']
  stars=data2['stars']
  comment__ = Comment(text,stars)
  db.session.add(comment__)
  db.session.commit() 
  
  Pid= int(data2['Pid'])
  cid= int(comment__.cid) 
  email=data2['email']
  print(cid)
  assoc = Comments(customer_email=email, product_pid=Pid, comment_id=cid)
  db.session.add(assoc)
  db.session.commit()
  return json.dumps({"status":True })


@app.route('/get_all_approved_comments')
def get_all_approved_commentshtml():
  return render_template('get_all_approved_comments.html')    

@app.route('/get_all_approved_comments/submit_test' , methods=['POST'], strict_slashes=False  )
def get_all_approved_commentstest():
  url = 'http://127.0.0.1:5000/get_all_approved_comments/submit' 
  myobj = {'Pid': request.form['Pid']}
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    
  
         

@app.route('/get_all_approved_comments/submit' , methods=['POST'], strict_slashes=False  )
def get_all_approved_comments():
  data2 = json.loads(request.get_data())
  print(request.get_data())   
  Pid= int(data2['Pid'])
  #allCustomers=Comment.query.filter_by().all()

#burada o pid altindaki all commentslerin comments relationsihpinde eristim
  allcomments = db.session.query(Comments).filter(Comments.product_pid== Pid )



  allapprovedcomments = []
  for i in allcomments:
    if (a:= db.session.query(approval)\
        .filter(approval.c.cid== i.comment_id ,approval.c.approved ==True ).first()) != None:
      allapprovedcomments.append(a)

  #appcoms= [i.cid if i.Pid ==Pid  and i.approved  else ""  for i in allapprovedcomments  ]
  

  retjs={}
  print(allapprovedcomments)
  for i,j in enumerate(allapprovedcomments): 
    print(j)
    retjs[i]={"text": (b:= db.session.query(Comment).filter(Comment.cid == j.cid ).first()).text,  
    "uid":  db.session.query(Comments).filter(Comments.comment_id == j.cid).first().customer_email ,
    "stars": b.stars}
  return json.dumps(retjs)


@app.route('/get_comments_for_approval')
def get_for_approved_commentshtml():
  return render_template('get_comments_for_approval.html')    

@app.route('/get_comments_for_approval/submit_test' , methods=['POST'], strict_slashes=False  )
def get_for_approved_commentstest():
  url = 'http://127.0.0.1:5000/get_comments_for_approval/submit' 
  myobj = {'Pmid': request.form['Pmid']}
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    
  
         

@app.route('/get_comments_for_approval/submit' , methods=['POST'], strict_slashes=False  )
def get_for_approved_comments():
  data2 = json.loads(request.get_data())
  print(request.get_data())   
  Pmid= int(data2['Pmid'])
  #get all pids from pmid 
  all_manages_pid = db.session.query(manages).filter(manages.c.Pmid == Pmid ).all()
  allcomments = db.session.query(Comments).filter()
  managed_by_pmid=[]
  for p in all_manages_pid:
    for com in allcomments:
      if p.Pid == com.product_pid: 
        managed_by_pmid.append(com)
        
  waiting_for_aproval=[]
  all_approved_comments = db.session.query(approval).filter().all()
  all_approved_comments_cid =  [ i.cid for i in all_approved_comments  ]

  for com in managed_by_pmid:
    if not ( com.comment_id in all_approved_comments_cid ):
      waiting_for_aproval.append(com)
  print(len(waiting_for_aproval))

  retjs=[]
  for j in waiting_for_aproval:     
    retjs.append( {
    "text": (b:= db.session.query(Comment).filter(Comment.cid == j.comment_id ).first()).text,  
    "uid": j.customer_email ,
    "stars": b.stars,
    "cid": b.cid
    
    })
  return json.dumps(retjs)  
       



@app.route('/get_all_approved_comments_no_input',  strict_slashes=False  )
def get_all_approved_commentsno_input():
  allCustomers=Comment.query.filter_by().all()

#burada o pid altindaki all commentslerin comments relationsihpinde eristim
  allcomments = db.session.query(Comments).filter()

  allapprovedcomments = []
  for i in allcomments:
    if (a:= db.session.query(approval)\
        .filter(approval.c.cid== i.comment_id ,approval.c.approved ==True ).first()) != None:
      allapprovedcomments.append(a)

  #appcoms= [i.cid if i.Pid ==Pid  and i.approved  else ""  for i in allapprovedcomments  ]
  

  retjs=[]
  print(allapprovedcomments)
  for i,j in enumerate(allapprovedcomments): 
    
    retjs.append( {"Pid":  db.session.query(Comments).filter(Comments.comment_id == j.cid).first().product_pid, 
    "text": (b:= db.session.query(Comment).filter(Comment.cid == j.cid ).first()).text,  
    "uid":  db.session.query(Comments).filter(Comments.comment_id == j.cid).first().customer_email ,
    "stars": b.stars} ) 
  return json.dumps(retjs)
       




@app.route('/Comment_all_ssubmit/submit_test' , methods=['POST'], strict_slashes=False  )
def Comment_all_ssubmit_test():
  url = 'http://127.0.0.1:5000/Comment_all_/submit'
  myobj = {'text': request.form['text'] , 
           'stars': request.form['stars'],
          'Pid': request.form['Pid'] ,
          'email':request.form['email']
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  


@app.route('/Comments/submit', methods=['POST'], strict_slashes=False )
def Commentsssubmit():
  data2 = json.loads(request.get_data())
  print(request.get_data())   
  Pid= int(data2['Pid'])
  cid= int(data2['cid']) 
  email=data2['email']

  #statement = shopping_cart.insert().values(customer_email=email, product_id=Pid, comment_id=cid)
  assoc = Comments(customer_email=email, product_pid=Pid, comment_id=cid)
  db.session.add(assoc)
  db.session.commit()
  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)
  #return render_template('success.html', data= "")    


@app.route('/buy_dlist')
def buydlist():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> customer_email </th><th> product_pid </th><th> purchased_purcid </th><th> quantity </th><th> date </th></tr> "
  allbuydlist = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allbuydlist:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email, i.product_pid, i.purchased_purcid, i.quantity, i.date) 
  todata +="</table>   "
  return render_template('buy_dlist.html',data =todata )  

@app.route('/buy_dlist/submit_test' , methods=['POST'], strict_slashes=False  )
def buydlistsubmittest():
  url = 'http://127.0.0.1:5000/buy_dlist/submit'
  myobj = {
           'quantity': request.form['quantity'],
          'Pid': request.form['Pid'] ,
          'uid':request.form['uid'],
          'purcid':request.form['purcid'],
          'did':request.form['did']
          
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  


@app.route('/buy_dlist/submit', methods=['POST'], strict_slashes=False )
def buydlistsubmit():
  
  data2 = json.loads(request.get_data())
  print(request.get_data())   
  customer_email= data2['uid']
  product_pid= int(data2['Pid']) 
  purchased_purcid= int(data2['purcid'])
  quantity= int(data2['quantity'])
  did= int(data2['did'])

  #statement = shopping_cart.insert().values(customer_email=email, product_id=Pid, comment_id=cid)
  assoc = Buy_Dlist(did = did, customer_email=customer_email, product_pid=product_pid, purchased_purcid=purchased_purcid, quantity=quantity)
  db.session.add(assoc)
  db.session.commit()
  return render_template('success.html', data= "")    

@app.route('/refunds')
def refunds():
  todata= "<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "
  
  
  todata+="<h3>Change Price </h3> "
  allchange_prince=db.session.query(change_price).all()
  todata+= "<table> <tr> <th>Sid </th> <th>Pid </th> </tr> "
  for i in allchange_prince:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid,i.Pid) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> Refunds </h3>"
  todata+= "<table> <tr> <th> id </th> <th> customer_email </th><th> purchased_purcid </th><th> sales_manager_id </th><th> refund_state </th><th> date </th></tr> "
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  for i in allrefunds:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.id, i.customer_email, i.purchased_purcid, i.sales_manager_id, i.refund_state, i.date) 
  todata +="</table> "
  return render_template('refunds.html',data =todata )  



@app.route('/refunds/submit_test' , methods=['POST'], strict_slashes=False  )
def refundssubmittest():
  url = 'http://127.0.0.1:5000/refunds/submit'
  myobj = {
          'uid':request.form['uid'],
          'purcid':request.form['purcid']          
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )  




   


@app.route('/refunds/submit', methods=['POST'] , strict_slashes=False )
def refundssubmit():
  try:
    data2 = json.loads(request.get_data())#request.get_json()
    #, strict_slashes=False 
    print(data2)
    customer_email= data2['uid']
    #sales_manager_id= int(data2['sid'])
    purchased_purcid= int(data2['purcid'])
    refund_state= "Requested"
    #getting pid
    

    allDlist = db.session.query(Buy_Dlist).all()
    my_pid = -1
    for i in allDlist:
      if(i.purchased_purcid==purchased_purcid):
        my_pid = i.product_pid
    
    #getting sid
    allsids = db.session.query(change_price).filter_by(Pid = my_pid).first()
    sales_manager_id = int(allsids.Sid)
    if(len(allsids)==0):
      retjs = {}
      retjs["status"] = False
      return json.dumps(retjs)

    my_purchased=Purchased.query.filter_by(purcid=purchased_purcid).first()
    if my_purchased.shipment == "Processing":
      refund_state= "Refunded"
      db.session.query(Purchased)\
          .filter(Purchased.purcid == purchased_purcid)\
          .update({Purchased.shipment: "Cancelled"})
      db.session.commit()
      #increase the stock of the product
      db.session.query(Products)\
          .filter(Products.Pid == my_pid)\
          .update({Products.quantity: Products.quantity + my_purchased.quantity})
      db.session.commit()
    else:
      db.session.query(Purchased)\
        .filter(Purchased.purcid == purchased_purcid)\
        .update({Purchased.shipment: "Refund in Progress"})
      db.session.commit()
      #statement = shopping_cart.insert().values(customer_email=email, product_id=Pid, comment_id=cid)

    assoc = Refunds(customer_email=customer_email, sales_manager_id=sales_manager_id, purchased_purcid=purchased_purcid, refund_state=refund_state)
    db.session.add(assoc)
      
    db.session.commit()
      

    retjs = {}
    retjs["status"] = True
    return json.dumps(retjs)
  except:
    retjs = {}
    retjs["status"] = False
    return json.dumps(retjs)






@app.route('/refunds_update')
def refunds_updatesssss():
  todata= "<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "
  
  
  todata+="<h3>Change Price </h3> "
  allchange_prince=db.session.query(change_price).all()
  todata+= "<table> <tr> <th>Sid </th> <th>Pid </th> </tr> "
  for i in allchange_prince:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid,i.Pid) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> Refunds </h3>"
  todata+= "<table> <tr> <th> id </th> <th> customer_email </th><th> purchased_purcid </th><th> sales_manager_id </th><th> refund_state </th><th> date </th></tr> "
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  for i in allrefunds:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.id, i.customer_email, i.purchased_purcid, i.sales_manager_id, i.refund_state, i.date) 
  todata +="</table> "
  return render_template('refunds_update.html',data =todata )  



@app.route('/refunds_update/submit_test' , methods=['POST'], strict_slashes=False  )
def refundsupdatesssubmittest():
  url = 'http://127.0.0.1:5000/refunds_update/submit'
  myobj = {
          'status':request.form['status'],
          'id':request.form['id']          
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )      

@app.route('/refunds_update/submit', methods=['POST'] , strict_slashes=False )
def refundssubmit_update():
  #rejected accepted 
  data2 = json.loads(request.get_data())#request.get_json()
  status= str(data2['status'])
  id= int(data2['id'])
  db.session.query(Refunds)\
          .filter(Refunds.id == id)\
          .update({Refunds.refund_state:status })

  my_refund= db.session.query(Refunds).filter(Refunds.id == id).first()
  db.session.query(Purchased)\
          .filter(Purchased.purcid == my_refund.purchased_purcid )\
          .update({Purchased.shipment:  "Refunded" if (status=="Refunded") else "Refund Rejected"  })
  db.session.commit()
  
  #get the product id by using my_refund.purchased_purcid using buy_dlist table
  my_pid= db.session.query(Buy_Dlist).filter(Buy_Dlist.purchased_purcid == my_refund.purchased_purcid).first().product_pid
  
  my_purchased = db.session.query(Purchased).filter(Purchased.purcid == my_refund.purchased_purcid).first()
  
  #if status is "refunded" then increase the quantity of the product by 1
  if (status=="Refunded"):
    db.session.query(Products)\
          .filter(Products.Pid == my_pid )\
          .update({Products.quantity: Products.quantity + my_purchased.quantity })
    db.session.commit()
  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)

@app.route('/purchased_update')
def purchased_updatesssss():
  todata= "<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "
  
  
  todata+="<h3>Change Price </h3> "
  allchange_prince=db.session.query(change_price).all()
  todata+= "<table> <tr> <th>Sid </th> <th>Pid </th> </tr> "
  for i in allchange_prince:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid,i.Pid) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> Refunds </h3>"
  todata+= "<table> <tr> <th> id </th> <th> customer_email </th><th> purchased_purcid </th><th> sales_manager_id </th><th> refund_state </th><th> date </th></tr> "
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  for i in allrefunds:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.id, i.customer_email, i.purchased_purcid, i.sales_manager_id, i.refund_state, i.date) 
  todata +="</table> "
  return render_template('purchased_update.html',data =todata )  



@app.route('/purchased_update/submit_test' , methods=['POST'], strict_slashes=False  )
def purchasedupdatesssubmittest():
  url = 'http://127.0.0.1:5000/purchased_update/submit'
  myobj = {
          'purcid':request.form['purcid'],
          'shipment':request.form['shipment']          
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    


@app.route('/purchased_update/submit', methods=['POST'] , strict_slashes=False )
def purchesdddssubmit_update():
  #
  data2 = json.loads(request.get_data())#request.get_json()
  shipment= str(data2['shipment'])
  purcid = int(data2['purcid'])
  
  db.session.query(Purchased)\
          .filter(Purchased.purcid ==purcid )\
          .update({Purchased.shipment: shipment  })
  db.session.commit()
  retjs = {}
  retjs["status"] = True
  return json.dumps(retjs)



@app.route('/refunds_get_all' )
def refunds_get_all():
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  retjs=[]
  for i in allrefunds:
    retjs.append(
      { "id" : i.id,
        "email": i.customer_email    ,
        "purcid": i.purchased_purcid    ,
        "sid": i.sales_manager_id    ,
        "refund_state": i.refund_state     
                  }
    )
  return json.dumps(retjs )

@app.route('/refunds_get_sid')
def refunds_get_sid():
  todata= "<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "
  
  
  todata+="<h3>Change Price </h3> "
  allchange_prince=db.session.query(change_price).all()
  todata+= "<table> <tr> <th>Sid </th> <th>Pid </th> </tr> "
  for i in allchange_prince:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid,i.Pid) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> Refunds </h3>"
  todata+= "<table> <tr> <th> id </th> <th> customer_email </th><th> purchased_purcid </th><th> sales_manager_id </th><th> refund_state </th><th> date </th></tr> "
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  for i in allrefunds:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.id, i.customer_email, i.purchased_purcid, i.sales_manager_id, i.refund_state, i.date) 
  todata +="</table> "
  return render_template('refunds_get_sid.html',data =todata )    

@app.route('/refunds_get_sid/submit_test',methods=['POST'] ,strict_slashes=False)
def refunds_get_sid_submit_test():  
  url = 'http://127.0.0.1:5000/refunds_get_sid/submit'
  myobj = {'Sid': request.form['Sid'] }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )   


@app.route('/refunds_get_sid/submit' , methods=['POST'] , strict_slashes=False  )
def refunds_get_sid_submit():
  data2 = json.loads(request.get_data())
  Sid = int(data2["Sid"])
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  retjs=[]
  for i in allrefunds:
    if i.sales_manager_id == Sid:
      my_purchased= Purchased.query.filter_by(purcid=i.purchased_purcid).first()
      retjs.append(
        { "id": i.id,
          "email": i.customer_email    ,
          "purcid": i.purchased_purcid    ,
          "sid": i.sales_manager_id    ,
          "refund_state": i.refund_state , 
          "quantity": my_purchased.quantity ,
          "price": my_purchased.price, 
          "sale": my_purchased.sale
        }
      )
  return json.dumps(retjs )

@app.route('/refunds_get_uid')
def refunds_get_uid():
  todata= "<h3> Sales Manager </h3> "
  allsalesmanag=Sales_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Sid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allsalesmanag:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Sid,i.name,i.pass_hash) 
  todata +="</table> "

  
  todata+="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "
  
  
  todata+="<h3>Change Price </h3> "
  allchange_prince=db.session.query(change_price).all()
  todata+= "<table> <tr> <th>Sid </th> <th>Pid </th> </tr> "
  for i in allchange_prince:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Sid,i.Pid) 
  todata +="</table>   "

  todata+= "<h3> Purchased </h3>"
  todata+= "<table> <tr> <th> purcid </th> <th> price </th><th> sale </th><th> quantity </th><th> shipment </th></tr> "
  allPurchased = db.session.query(Purchased).all()  # db.session.query(followers).filter(...).all()
  for i in allPurchased:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.purcid, i.price ,i.sale, i.quantity, i.shipment ) 
  todata +="</table>   "

  todata+= "<h3> Refunds </h3>"
  todata+= "<table> <tr> <th> id </th> <th> customer_email </th><th> purchased_purcid </th><th> sales_manager_id </th><th> refund_state </th><th> date </th></tr> "
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  for i in allrefunds:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></td><td>{}</td><td>{}</td></tr>".format(i.id, i.customer_email, i.purchased_purcid, i.sales_manager_id, i.refund_state, i.date) 
  todata +="</table> "
  return render_template('refunds_get_uid.html',data =todata )    

@app.route('/refunds_get_uid/submit_test',methods=['POST'] ,strict_slashes=False)
def refunds_get_uid_submit_test():  
  url = 'http://127.0.0.1:5000/refunds_get_uid/submit'
  myobj = {'email': request.form['email'] }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )   

@app.route('/refunds_get_uid/submit' , methods=['POST'] , strict_slashes=False  )
def refunds_get_uid_submit():
  data2 = json.loads(request.get_data())
  email = str(data2["email"])
  allrefunds = db.session.query(Refunds).all()  # db.session.query(followers).filter(...).all()
  retjs=[]
  for i in allrefunds:
    if (i.customer_email == email):
      retjs.append(
        { "email": i.customer_email    ,
          "purcid": i.purchased_purcid    ,
          "refund_state": i.refund_state     
        }
      )
  return json.dumps(retjs )




@app.route('/check_stock/submit', methods=['POST'] , strict_slashes=False  )
def check_stock_sub():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 


  Pid = data2['Pid']
  in_stock = Products.query.filter_by(Pid=Pid).all()
  st={}
  if(len(in_stock)==0 ):
    st["status"] = False 
    st["quantity"] = None 
  else: 
    st["status"] = True 
    st["quantity"] = str(in_stock[0].quantity)
  return json.dumps(st)

@app.route('/check_stock')
def check_stock():
  url = 'http://127.0.0.1:5000/check_stock/submit'
  myobj = {'Pid': '3'}
  return req.post(url, data = myobj).text



@app.route('/dec_stock/submit', methods=['POST'], strict_slashes=False )
def dec_stock_sub():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 


  Pid = data2['Pid']
  quantity = int(data2['quantity'])
  in_stock = Products.query.filter_by(Pid=Pid).all()
  st={}
  if(len(in_stock)==0 ):
    st["status"] = False 
    st["quantity"] = None 
  else:    
    if(in_stock[0].quantity >=quantity):
      db.session.query(Products)\
       .filter(Products.Pid == Pid)\
       .update({Products.quantity: Products.quantity - quantity})
      db.session.commit()
      st["status"] = True 
      st["quantity"] = str(in_stock[0].quantity - quantity )
    else:
      st["status"] = False 
      st["quantity"] = str(in_stock[0].quantity)    
  return json.dumps(st)

@app.route('/dec_stock')
def dec_stock():
  url = 'http://127.0.0.1:5000/dec_stock/submit'
  myobj = {'Pid': '1' , "quantity" : "3" }
  return req.post(url, data = myobj).text



@app.route('/all_category')
def all_Category():
  js={}
  allproductscats=Product_Category.query.filter_by().all()
  for pc in allproductscats:
    if( not pc.deleted ):
      js[pc.Pcid]=pc.name
  return json.dumps(js)

@app.route('/undelete_product_category')
def undelete_product_category():
  todata=""  
  todata+="<h3> Product Category </h3> "
  allproductscats=Product_Category.query.filter_by().all()
  todata+= "<table> <tr> <th>pcid </th> <th>name </th> </tr> "
  for i in allproductscats:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.name) 
  todata +="</table>   "
  return render_template('undelete_product_category.html',data=todata) 

#submit test for delete product
@app.route('/undelete_product_category/submit_test', methods=['POST'], strict_slashes=False  )
def undelete_product_category_submittest():
  url = 'http://127.0.0.1:5000/undelete_product_category/submit'
  myobj = {'Pcid': request.form['Pcid'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text ) 
  


#delete product category
@app.route('/undelete_product_category/submit', methods=['POST'] , strict_slashes=False  )
def undelete_product_category_sub():
  retjs={}
  data2 = json.loads(request.get_data())
  Pcid = int(data2['Pcid'])
  db.session.query(Product_Category).filter(Product_Category.Pcid == Pcid).update({"deleted": False})
  db.session.commit()
  retjs["status"] = True 
  return json.dumps(retjs)  

@app.route('/delete_product_category')
def delete_product_category():
  todata=""  
  todata+="<h3> Product Category </h3> "
  allproductscats=Product_Category.query.filter_by().all()
  todata+= "<table> <tr> <th>pcid </th> <th>name </th> </tr> "
  for i in allproductscats:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pcid,i.name) 
  todata +="</table>   "
  return render_template('delete_product_category.html',data=todata) 

#submit test for delete product
@app.route('/delete_product_category/submit_test', methods=['POST'], strict_slashes=False  )
def delete_product_category_submittest():
  url = 'http://127.0.0.1:5000/delete_product_category/submit'
  myobj = {'Pcid': request.form['Pcid'] 
    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text ) 
  


#delete product category
@app.route('/delete_product_category/submit', methods=['POST'] , strict_slashes=False  )
def delete_product_category_sub():
  retjs={}
  data2 = json.loads(request.get_data())
  Pcid = int(data2['Pcid'])
  db.session.query(Product_Category).filter(Product_Category.Pcid == Pcid).update({"deleted": True})
  db.session.commit()
  retjs["status"] = True
  return json.dumps(retjs)




@app.route('/all_books_category_ranged')
def all_books_category_ranged():
  allproducts=Products.query.filter_by().all() 
  
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> <th>categories</th> </tr> '
  for i in allproducts:
    allcategs = db.session.query(under).filter_by(Pid = i.Pid).all()
    allcategsSTR = []
    for j in allcategs:
      allcategsSTR.append(int(j.Pcid))
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.Pid,i.name,i.price,i.sale,allcategsSTR ) 
  todata +="</table>"
  
  return render_template('all_books_category_ranged.html',data =todata )  #bunu degistirdim


@app.route('/all_books_category_ranged/submit', methods=['POST'], strict_slashes=False  )
def all_books_category_ranged_sub():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 


  min = int ( data2['min'] ) 
  max = int ( data2['max'] ) 
  Pcid = int(data2['Pcid'] )
  allproducts=Products.query.filter_by().all()
  jsonprd = []
  allUnders = db.session.query(under).all() 

  catlist=[]
  for i in allproducts:
    for j in allUnders:
      if j.Pcid== Pcid and j.Pid == i.Pid:
        catlist.append(i)


  for i,pr in enumerate(catlist): 

    if i< min:
      continue  
    if i> max:
      break
    if(pr.deleted == False):
      tmp={
        "id": pr.Pid,
        "img": pr.picture_url0,
        "img1": pr.picture_url1,
        "img2": pr.picture_url2,
        "title": pr.name ,
        "author": pr.author,
        "raiting": pr.raiting,      
        "publisher": pr.distributor_Information,
        "price":  pr.price ,    
        "amount_sold": pr.amount_sold ,
        "release_date": str(pr.date),
        "model": pr.model,
        "edition_number": pr.edition_number,
        "description": pr.description,
        "in_stock": pr.quantity,
        "warranty": pr.warranty,
        "discount": str((1-pr.sale)*100)+"%",
        "date": pr.date
      }
      jsonprd.append(tmp)  
  return json.dumps(jsonprd)

#create all books category ranged submit_test function
@app.route('/all_books_category_ranged/submit_test', methods=['POST'], strict_slashes=False  )
def all_books_category_ranged_sub_test():
  url = 'http://127.0.0.1:5000/all_books_category_ranged/submit'
  myobj = {'min': request.form['min'],
           'max': request.form['max'],
           'Pcid': request.form['Pcid']
           }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    



    

@app.route('/remove_from_cart')
def remove_from_cart():
  todata= "<h3> Shopping_Cart </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th><th> Quantity </th></tr> "
  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date, i.quantity) 
  todata +="</table>   "
  return render_template('remove_from_cart.html',data =todata ) 

  
@app.route('/remove_from_cart/submit', methods=['POST'] , strict_slashes=False )
def remove_from_cart_sub():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 

  
  email =  data2['email'] 
  Pid = int (data2['Pid'] )
  quantity = int ( data2['quantity'] )
  if quantity > 0 :
    allUnders = db.session.query(shopping_cart)\
        .filter(shopping_cart.c.email == email ,shopping_cart.c.Pid == Pid )\
          .update({shopping_cart.c.quantity:  quantity})
    db.session.commit()
  else:
    allUnders = db.session.query(shopping_cart)\
        .filter(shopping_cart.c.email == email ,shopping_cart.c.Pid == Pid )\
          .delete()
    db.session.commit()

  retjs ={}
  
  
  retjs["status"] = True
  return json.dumps(retjs)

  #return render_template('success.html',data ="" ) 


@app.route('/to_purchase')
def topurchase():

  todata="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"

  allPurchased=Purchased.query.filter_by().all()
  todata+=" <h3> Purchased </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>purcid </th> <th> price </th> <th>sale</th> <th>quantity</th><th>shipment</th> </tr> '
  for i in allPurchased:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.purcid,i.price,i.sale,i.quantity,i.shipment) 
  todata +="</table>"

  todata+= "<h3> Shopping_Cart </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th><th> Quantity </th></tr> "
  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date, i.quantity) 
  todata +="</table>   "
  
  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> email </th><th> pid </th><th> Quantity </th><th> Purcid </th><th> Date </th></tr> "
  allShoppingCarts = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email,i.product_pid,i.quantity,i.purchased_purcid, i.date ) 
  todata +="</table> "

  
  return render_template('to_purchase.html',data =todata ) 


@app.route('/getnextdid/submit_test', methods=['POST'], strict_slashes=False  )
def gettingnextdidtest():
  url = 'http://127.0.0.1:5000/getnextdid'
  myobj = {    }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    


@app.route('/getnextdid')
def gettingnextdid():
  allbuy_dlists = db.session.query(Buy_Dlist).all()
  didvalues = []
  if(len(allbuy_dlists) == 0):
    return "1"
  for i in allbuy_dlists:
    didvalues.append(i.did)
  maxDid=max(didvalues)+1 #actually max+1
  return str(maxDid)

@app.route('/decreasestock/submit_test')
def decreasesstocks_test():  
  url = 'http://127.0.0.1:5000/decreasestock/submit'
  myobj = {"Pid":10 , "quantity":100 }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    




@app.route('/decreasestock/submit', methods=['POST'] , strict_slashes=False)
def decreasesstocks():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 
  print(data2)
  quantity=int (data2['quantity'] )
  Pid=int ( data2['Pid'] )
  retjs ={}
  
  if (Products.query.filter_by(Pid=Pid).first().quantity<quantity):
    retjs["status"] = False
  else:    
    retjs["status"] = True
    db.session.query(Products)\
      .filter(Products.Pid == Pid)\
      .update( {Products.quantity: Products.quantity-quantity , Products.amount_sold: Products.amount_sold+quantity } )

    db.session.commit() 
  return json.dumps(retjs)   
  
@app.route('/to_purchase/submit_test', methods=['POST'] , strict_slashes=False )
def to_purchase_sub_test():

  url = 'http://127.0.0.1:5000/to_purchase/submit'
  myobj = {'quantity': request.form['quantity'],
           'price': request.form['price'],
           'sale': request.form['sale'],
           'email': request.form['email'],
           'Pid': request.form['Pid'],
           'did': request.form['did']
           }
  return render_template("success.html", data= req.post(url, data = json.dumps(myobj)).text )    



@app.route('/to_purchase/submit', methods=['POST'] , strict_slashes=False )
def to_purchase_sub():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 


  quantity=int (data2['quantity'] )
  price=int ( data2['price'] )
  sale=float( data2['sale'] )
  shipment = "Processing"
  PC__ = Purchased(price=price, sale=sale, quantity=quantity,shipment=shipment)
  db.session.add(PC__)
  db.session.commit() 

  maxPurcid=PC__.purcid

  email=data2['email']
  Pid=int(data2['Pid'])
  purcid=maxPurcid #how do we get this?
  did=int(data2['did'])
  assoc = Buy_Dlist(did = did, customer_email=email, product_pid=Pid, purchased_purcid=purcid, quantity=quantity)
  db.session.add(assoc)
  db.session.commit()

  #myCustomer = Customers.query.filter_by(email=email).first()
  mycustomer=Customers.query.filter_by(email = email).first() 
  myproduct=Products.query.filter_by(Pid = Pid).first() 

  try:
    text= "Thank you for your purchase " + str(mycustomer.name) + "! \n" + "Your order has been proccessed successfully. \n"
    text+= "Your delivery id: " + str(did) +"\n"
    text+= "Purchase id of product: " + str(purcid) +"\n"
    text+= "Product name: " + str(myproduct.name) + "\n"
    text+= "You bougth: " + str(quantity) +" many of this item \n"
    text+= "It cost: " + str(price) +"\n"
    text+= "You had discount of: " + "%" + str(100*(1-sale)) +"\n"
    text+= "Shipping: " + str(shipment) +"\n"
    

    send_email(email, text )
    retjs = {}
    retjs["status"] = True
    return json.dumps(retjs)

  except:
    print("Email error")
    retjs = {}
    retjs["status"] = True
    return json.dumps(retjs)
    

@app.route('/delivery_process')
def deliveryprocess():
  todata="<h3> Product Manager </h3> "
  allproductmanags=Product_Manager.query.filter_by().all()
  todata+= "<table> <tr> <th>Pcid </th> <th>name </th><th>pass_hash </th> </tr> "
  for i in allproductmanags:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.Pmid,i.name,i.pass_hash) 
  todata +="</table> "

  allproducts=Products.query.filter_by().all()
  todata+=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"

  todata+= "<h3> buy_dlist </h3>"
  todata+= "<table> <tr> <th> did </th> <th> email </th><th> pid </th><th> Quantity </th><th> Purcid </th><th> Date </th></tr> "
  allShoppingCarts = db.session.query(Buy_Dlist).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.did, i.customer_email,i.product_pid,i.quantity,i.purchased_purcid, i.date ) 
  todata +="</table> "

  allPurchased=Purchased.query.filter_by().all()
  todata+=" <h3> Purchased </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>purcid </th> <th> price </th> <th>sale</th> <th>quantity</th><th>shipment</th> </tr> '
  for i in allPurchased:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.purcid,i.price,i.sale,i.quantity,i.shipment) 
  todata +="</table>"

  todata+= "<h3> Manages  </h3>"
  todata+= "<table> <tr> <th> Pid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pid,i.Pmid) 
  todata +="</table>   "


  return render_template('delivery_process.html',data =todata )  #bunu degistirdim  

@app.route('/delivery_process/submit', methods=['POST'] , strict_slashes=False  )
def deliveryprocesssubmit():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 

  
  Process=str ( data2['Process'] )
  Pmid=int ( data2['Pmid'] )
  Pid=int( data2['Pid'] )
  purcid = int( data2['purcid'] )
 
  allManages = db.session.query(manages).all()
  valid = False #aslinda not valid anlaminda

  for i in allManages:
    if(i.Pid==Pid and i.Pmid == Pmid):
      valid = True

  if (not valid):
    return "False" #eger managelamiyosa false returnluyo yani yanlis product manager yanlis producta bakiyo

  allDlist = db.session.query(Buy_Dlist).all()

  valid = False
  for i in allDlist:
    if(i.purchased_purcid==purcid):
      valid = True

  if (not valid):
    return "False" #eger buy_dlist te degilse false returnluyo yani zaten deliverlanmis deliverlananlar buy_dlistte

   # i was just testing you, can you compile i'll check
  db.session.query(Purchased)\
    .filter(Purchased.purcid == purcid)\
    .update({Purchased.shipment: Process})

  db.session.commit()

  #allPurchased = db.session.query(Purchased).all()
  #for i in allPurchased:
  #  if(i.shipment=="Delivered"):
  #    for j in allDlist:
  #      if(j.purchased_purcid == i.purcid):
  #        db.session.query(Buy_Dlist)\
  #          .filter(Buy_Dlist.purchased_purcid == i.purcid)\
  #          .delete()
  #        db.session.commit()  


  return render_template('success.html',data ="" ) 
   

def ask_bank(creddit_card_number,cvc,exp_date):
  return True
def execute_transaction(creddit_card_number,cvc,exp_date, total_price):
  return True



@app.route('/get_users_purchases/submit' , methods=["POST"] , strict_slashes=False )
def get_users_purchases():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 

  Pid=str ( data2['Pid'] )  
  purcid = int(data2['purcid'] )
  allManages = db.session.query(Buy_Dlist).all()
  Purchasesss = db.session.query(Purchased).all()
  ll=[]
  for i in allManages:
    if i.Pid ==Pid:
      for j in Purchasesss:
        if j.purcid == i.purcid:
          ll.append(j)
  retjs={}
  for i in ll: # DO left JOIN !!!!!!!!!!!!!!!!!!!!!!
    pass#retjs[]
  return ""

  


@app.route('/bank')
def bank():
  return render_template("bank.html")


@app.route('/bank/submit',methods=['POST']  , strict_slashes=False  )
def bank_sub():
  data2 = json.loads(request.get_data())#request.get_json()
  #, strict_slashes=False 
  #creddit_card_number =  int(request.form['creddit_card_number'] )
  creddit_card_number =  int(data2['creddit_card_number'] )
  #cvc = int ( request.form['cvc'] )
  cvc = int ( data2['cvc'] )
  #exp_date =  int(request.form['date'] )
  exp_date =  int(data2['date'] )
  #total_price =  int(request.form['total_price']  )
  total_price =  int(data2['total_price']  )

  if ask_bank(creddit_card_number,cvc,exp_date):
    execute_transaction(creddit_card_number,cvc,exp_date, total_price)
    return "true"
  else: 
    return "false"




#################################################
if __name__ == '__main__':  #python interpreter assigns "__main__" to the file you run
  db.create_all()
  app.run(debug=True)
  


