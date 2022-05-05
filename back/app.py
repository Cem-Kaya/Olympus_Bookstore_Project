#from crypt import methods
import json
from unittest import skip
import requests as req

from flask_cors import CORS
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import null
from sqlalchemy.orm import sessionmaker

from DB_init_SQL import * 

 
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'
app.config['SQLALCHEMY_MAX_OVERFLOW']= -1 
app.config['SQLALCHEMY_POOL_TIMEOUT']= 120 


db=SQLAlchemy(app)






@app.route('/')
def index():
  return render_template('index.html')


@app.route('/super_secret_all_tables_panel')
def alltables():
  todata = "<h2> ENTITIES</h2>"
  todata +="<h3>Customers </h3> "
  allCustomers=Customers.query.filter_by().all()
  todata+= "<table> <tr> <th>email </th> <th>name </th> </tr> "
  for i in allCustomers:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.email,i.name) 
  todata +="</table>   "

  todata+="<h3> Product Manager </h3> "
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
  todata+= "<table> <tr> <th> Pid </th> <th> Pmid </th> </tr> "
  allUnders = db.session.query(manages).all()  # db.session.query(followers).filter(...).all()
  for i in allUnders:
    todata += "<tr><td>{}</td><td>{}</td></tr>".format(i.Pid,i.Pmid) 
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



@app.route('/signup/submit', methods=['POST'])
def signupsubmit():
  data2 = request.get_json()

  print(request.get_data())
  name= data2['name']
  pass_hash=data2['pass_hash']
  email=data2['email']
  homeadress=data2['homeadress']

  retjs ={}
  if len(Customers.query.filter_by(email=email).all())!=0:
    retjs["status"] = False
    retjs["uid"] = None
  else:    
    custumer__= Customers(name,pass_hash,email,homeadress)
    db.session.add(custumer__)
    db.session.commit()  
    retjs["status"] = True
    retjs["uid"] = email

  return json.dumps(retjs)




@app.route('/Product_manager_reg')
def Product_manager_reg():
  return render_template('Product_manager_reg.html')  

@app.route('/Product_manager_reg/submit', methods=['POST'])
def Product_manager_regsubmit():  
  name= request.form['name']
  pass_hash=request.form['pass_hash']

  PM__= Product_Manager(name=name,pass_hash=pass_hash)
  db.session.add(PM__)
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


@app.route('/comment_reg')
def comment_reg():
  return render_template('comment_reg.html')  
            
@app.route('/comment_reg/submit', methods=['POST'])
def comment_regsubmit():  
  text=request.form['text']
  stars=request.form['stars']
  comment__ = Comment(text,stars)
  db.session.add(comment__)
  db.session.commit() 
  return render_template('success.html', data= text )  



@app.route('/Sales_manager_reg')
def Sales_manager_reg():
  return render_template('Sales_manager_reg.html')  
            
@app.route('/Sales_manager_reg/submit', methods=['POST'])
def Sales_manager_regsubmit():
  
  name= request.form['name']
  pass_hash=request.form['pass_hash']

  Sales_manager = Sales_Manager(name,pass_hash)
  db.session.add(Sales_manager)
  db.session.commit()  

  return render_template('success.html', data= name)



@app.route('/Product_Catogary_reg')
def Prc():
  return render_template('Product_Catogary_reg.html')  
            
@app.route('/Product_Catogary_reg/submit', methods=['POST'])
def Prcsubmit():  
  name=request.form['name']
  PC__ = Product_Category(name)
  db.session.add(PC__)
  db.session.commit() 
  return render_template('success.html', data= name)  

@app.route('/purchased')
def Purchasedd():
  allPurchased=Purchased.query.filter_by().all()
  todata=" <h3> Purchased </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>purcid </th> <th> price </th> <th>sale</th> <th>quantity</th><th>shipment</th> </tr> '
  for i in allPurchased:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td></tr>".format(i.purcid,i.price,i.sale,i.quantity,i.shipment) 
  todata +="</table>"

  return render_template('purchased.html',data=todata)  
            
@app.route('/purchased/submit', methods=['POST'])
def Purchasedsubmit():  
  price=request.form['price']
  sale=request.form['sale']
  quantity=request.form['quantity']
  shipment=request.form['shipment']
  PC__ = Purchased(price=price, sale=sale, quantity=quantity,shipment=shipment)
  db.session.add(PC__)
  db.session.commit() 
  return render_template('success.html', data= "")    





@app.route('/all_books')
def get_all_books():
  allproducts=Products.query.filter_by().all()
  jsonprd = []

  for pr in allproducts:
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
    

@app.route('/all_books_ranged')
def all_books_rangedd():
  allproducts=Products.query.filter_by().all()
  todata=" <h3> Products </h3> " # <h1>A heading here</h1>
  todata+= '<table <tr> <th>pid </th> <th> name </th> <th>price</th> <th>sale</th> </tr> '
  for i in allproducts:
    todata += "<tr><td> {} </td> <td> {} </td> <td> {} </td> <td> {} </td> </tr>".format(i.Pid,i.name,i.price,i.sale) 
  todata +="</table>"
  
  return render_template('all_books_ranged.html',data =todata )  #bunu degistirdim


@app.route('/all_books_ranged/submit', methods=['POST'] )
def get_all_books_ranged_sub():
  min = int ( request.form['min'] ) 
  max = int ( request.form['max'] ) 

  allproducts=Products.query.filter_by().all()
  jsonprd = []

  for i,pr in enumerate(allproducts):
    if i< min:
      continue  
    if i> max:
      break
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
    
@app.route('/templates/script.js')
def scriptjs():    
  return render_template("script.js")

@app.route('/templates/form-to-json.js')
def scriptformtojs():    
  return render_template("form-to-json.js")


@app.route('/login')
def login():
  return render_template('login.html')  


@app.route('/login/submit', methods=['POST'] , strict_slashes=False )
def loginsubmit():
  data2 = request.get_json()
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


@app.route('/Under/submit', methods=['POST'])
def Undersubmit():
  Pid=request.form['Pid']
  Pcid=request.form['Pcid']
  statement = under.insert().values(Pid=Pid, Pcid=Pcid)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")    


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


@app.route('/Manages_category/submit', methods=['POST'])
def Manages_categorysubmit():
  Pcid=request.form['Pcid']
  Pmid=request.form['Pmid']
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


@app.route('/Manages/submit', methods=['POST'])
def Managessubmit():
  Pid=request.form['Pid']
  Pmid=request.form['Pmid']
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


@app.route('/Change_price/submit', methods=['POST'])
def changespricesubmit():
  Pid=request.form['Pid']
  Sid=request.form['Sid']
  statement = change_price.insert().values(Sid=Sid, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")        

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


@app.route('/Wishes/submit', methods=['POST'])
def Wishessubmit():
  Pid=request.form['Pid']
  email=request.form['email']
  statement = wishes.insert().values(email=email, Pid=Pid)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")    

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


@app.route('/Shopping_Cart/submit', methods=['POST'])
def Shopping_Cartsubmit():
  Pid= int(request.form['Pid']) 
  email=request.form['email']
  quantity=int(request.form['quantity'])

  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    print(i.email , email , i.email == email)
    print(i.Pid , Pid , i.Pid == Pid)
    if(i.email == email and i.Pid == Pid): # i was just testing you, can you compile i'll check
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


@app.route('/Approval/submit', methods=['POST'])
def Approval_pagesubmit():
  Pmid= int(request.form['Pmid']) 
  cid=request.form['cid']
  approved=bool(request.form['approved'])

  statement = approval.insert().values(Pmid=Pmid, cid=cid, approved=approved)
  db.session.execute(statement)
  db.session.commit()
  return render_template('success.html', data= "")  


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
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.customer_email, i.comment_id, i.product_pid, i.date) 
  todata +="</table>   "
  return render_template('Comments.html',data =todata )  


@app.route('/Comments/submit', methods=['POST'])
def Commentsssubmit():
  Pid= int(request.form['Pid'])
  cid= int(request.form['cid']) 
  email=request.form['email']

  #statement = shopping_cart.insert().values(customer_email=email, product_id=Pid, comment_id=cid)
  assoc = Comments(customer_email=email, product_pid=Pid, comment_id=cid)
  db.session.add(assoc)
  db.session.commit()
  return render_template('success.html', data= "")    


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


@app.route('/buy_dlist/submit', methods=['POST'])
def buydlistsubmit():
  customer_email= request.form['uid']
  product_pid= int(request.form['Pid']) 
  purchased_purcid= int(request.form['purcid'])
  quantity= int(request.form['quantity'])
  did= int(request.form['did'])

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
  todata +="</table>   "
  return render_template('refunds.html',data =todata )  


@app.route('/refunds/submit', methods=['POST'])
def refundssubmit():
  customer_email= request.form['uid']
  sales_manager_id= int(request.form['sid'])
  purchased_purcid= int(request.form['purcid'])
  refund_state= request.form['refund']

  #statement = shopping_cart.insert().values(customer_email=email, product_id=Pid, comment_id=cid)
  assoc = Refunds(customer_email=customer_email, sales_manager_id=sales_manager_id, purchased_purcid=purchased_purcid, refund_state=refund_state)
  db.session.add(assoc)
  db.session.commit()
  return render_template('success.html', data= "")    


@app.route('/check_stock/submit', methods=['POST'])
def check_stock_sub():
  Pid = request.form['Pid']
  in_stock = Products.query.filter_by(Pid=Pid).all()
  st={}
  if(len(in_stock)==0 ):
    st["status"] = False 
    st["quantity"] = NULL 
  else: 
    st["status"] = True 
    st["quantity"] = str(in_stock[0].quantity)
  return json.dumps(st)

@app.route('/check_stock')
def check_stock():
  url = 'http://127.0.0.1:5000/check_stock/submit'
  myobj = {'Pid': '3'}
  return req.post(url, data = myobj).text



@app.route('/dec_stock/submit', methods=['POST'])
def dec_stock_sub():
  Pid = request.form['Pid']
  quantity = int(request.form['quantity'])
  in_stock = Products.query.filter_by(Pid=Pid).all()
  st={}
  if(len(in_stock)==0 ):
    st["status"] = False 
    st["quantity"] = NULL 
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
    js[pc.Pcid]=pc.name
  return json.dumps(js)


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


@app.route('/all_books_category_ranged/submit', methods=['POST'] )
def all_books_category_ranged_sub():
  min = int ( request.form['min'] ) 
  max = int ( request.form['max'] ) 
  Pcid = int(request.form['Pcid'] )
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
    

@app.route('/remove_from_cart')
def remove_from_cart():
  todata= "<h3> Shopping_Cart </h3>"
  todata+= "<table> <tr> <th> email </th> <th> Pid </th><th> Date </th><th> Quantity </th></tr> "
  allShoppingCarts = db.session.query(shopping_cart).all()  # db.session.query(followers).filter(...).all()
  for i in allShoppingCarts:
    todata += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(i.email,i.Pid, i.date, i.quantity) 
  todata +="</table>   "
  return render_template('remove_from_cart.html',data =todata ) 

  
@app.route('/remove_from_cart/submit', methods=['POST'] )
def remove_from_cart_sub():
  email =  request.form['email'] 
  Pid = int ( request.form['Pid'] )
  quantity = int ( request.form['quantity'] )
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
  return render_template('success.html',data ="" ) 

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
  

@app.route('/to_purchase/submit', methods=['POST'] )
def to_purchase_sub():
  
  quantity=int ( request.form['quantity'] )
  price=int ( request.form['price'] )
  sale=float( request.form['sale'] )
  shipment = "Processing"
  PC__ = Purchased(price=price, sale=sale, quantity=quantity,shipment=shipment)
  db.session.add(PC__)
  db.session.commit() 

  allpurchased = db.session.query(Purchased).all()
  pucidvalues = []
  for i in allpurchased:
    pucidvalues.append(int(i.purcid))
  maxPurcid=max(pucidvalues)

  email=request.form['email']
  Pid=int(request.form['Pid'])
  purcid=maxPurcid #how do we get this?
  did=int(request.form['did'])
  assoc = Buy_Dlist(did = did, customer_email=email, product_pid=Pid, purchased_purcid=purcid, quantity=quantity)
  db.session.add(assoc)
  db.session.commit()
  return render_template('success.html',data ="" ) 

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

@app.route('/delivery_process/submit', methods=['POST'] )
def deliveryprocesssubmit():
  
  Process=str ( request.form['Process'] )
  Pmid=int ( request.form['Pmid'] )
  Pid=int( request.form['Pid'] )
  purcid = int( request.form['purcid'] )
 
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

@app.route('/get_users_purchases/submit' , methods=["POST"])
def get_users_purchases():
  Pid=str ( request.form['Pid'] )  
  purcid = int( request.form['purcid'] )
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


@app.route('/bank/submit',methods=['POST'] )
def bank_sub():
  creddit_card_number =  int(request.form['creddit_card_number'] )
  cvc = int ( request.form['cvc'] )
  exp_date =  int(request.form['date'] )
  total_price =  int(request.form['total_price']  )
  if ask_bank(creddit_card_number,cvc,exp_date):
    execute_transaction(creddit_card_number,cvc,exp_date, total_price)
    return "true"
  else: 
    return "false"




#################################################
if __name__ == '__main__':  #python interpreter assigns "__main__" to the file you run
  db.create_all()
  app.run(debug=True)
  


