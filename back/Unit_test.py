from sympy import satisfiable
from app import * 
import requests as req
import json

def unit_test1():
    #build up 
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN"   }
    #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true, "uid": "test@test.test"}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat

def unit_test2():
    #build up 
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN"   }
    #test  pass_hash homeadress /signup/submit
    req.post(url, data = json.dumps(myobj))
    stat =False
    #print(req.post(url, data = json.dumps(myobj)).text ) 
    if req.post(url, data = json.dumps(myobj)).text == '{"status": false, "uid": null}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat

def unit_test3():
    #build up 
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": "123" , "homeadress":"SUN"   }
    #test  pass_hash homeadress /signup/submit
    req.post(url, data = json.dumps(myobj)).text


    url = 'http://127.0.0.1:5000/login/submit'
    myobj = {'email': "test@test.test" , 'pass_hash': "123" }
    #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true, "uid": "test@test.test"}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat

def unit_test4():
    #build up 
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": "123" , "homeadress":"SUN"   }
    #test  pass_hash homeadress /signup/submit
    req.post(url, data = json.dumps(myobj)).text


    url = 'http://127.0.0.1:5000/login/submit'
    myobj = {'email': "test@test.test" , 'pass_hash': "124" }
    #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": false, "uid": false}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat

def unit_test5():
    #build up 
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": "123" , "homeadress":"SUN"   }
    #test  pass_hash homeadress /signup/submit
    req.post(url, data = json.dumps(myobj)).text


    url = 'http://127.0.0.1:5000/customer_info/submit'
    myobj = {'email': "test@test.test" }
    #test  pass_hash homeadress /signup/submit
    stat =False
    
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true, "uid": "test@test.test", "name": "unit test", "pass_hash": "123", "homeaddress": "SUN"}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat

def unit_test6():
    #build up 
 
    url = 'http://127.0.0.1:5000/customer_info/submit'
    myobj = {'email': "test@test.testf" }
    #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": false, "uid": null}':
        stat =True 
    #teardown       
 
  
    return stat

def unit_test7():
    #build up 
 
    url = 'http://127.0.0.1:5000/Products_reg/submit'
    myobj = {'name': "fsdfsdfsd" , 
           'model': "request.form['model']",
           'description': "request.form['description']",
           'edition_number': "5",
           'quantity': "12",
           'amount_sold': "8",
           'price': "4",  
           'raiting': "5", 
           'author': "request.form['author']", 
           'warranty': "request.form['warranty']", 
           'distributor_Information': "request.form['distributor_Information']",   
           'sale': "0.5", 
           'picture_url0': "request.form['picture_url0']", 
           'picture_url1': "request.form['picture_url1']", 
           'picture_url2': "request.form['picture_url2']",
           'Pcid': "1",
           'Sid': "1",
           'Pmid': "1"
           
    }    #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
        stat =True    
    #teardown 
    allproducts=Products.query.filter_by().all()
    pidvalues = []
    for i in allproducts:
        pidvalues.append(i.Pid)
    maxPid=max(pidvalues) 
    underDelete = db.session.query(under)\
        .filter(under.c.Pid ==  int(maxPid) )\
          .delete()    
    managesDelete = db.session.query(manages)\
        .filter(manages.c.Pid ==  int(maxPid) )\
          .delete()     
    changePrice = db.session.query(change_price)\
        .filter(change_price.c.Pid ==  int(maxPid) )\
          .delete()                           
    productsdelete = db.session.query(Products)\
        .filter(Products.Pid == int(maxPid))\
            .delete()
    db.session.commit()      
  
    return stat    

def unit_test8():
    #build up 
 
    url = 'http://127.0.0.1:5000/comment_reg/submit'
  
    myobj = {'text': "request.form['text']" , 
           'stars': "3"
    }   #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    deletecomment = db.session.query(Comment)\
        .filter(Comment.text ==  "request.form['text']" )\
        .delete()     
    db.session.commit()                 
    return stat    
    
def unit_test9():
    #build up 
 
    url = 'http://127.0.0.1:5000/purchased/submit'
  
    myobj = {'price': "1" , 
           'sale': "1",
           'quantity': "1",
           'shipment': "Testing"
    }  #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    deletecomment = db.session.query(Purchased)\
        .filter(Purchased.shipment ==  "Testing" )\
        .delete()     
    db.session.commit()                 
    return stat   

def unit_test10():    #checks stock decrease function. first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/Products_reg/submit'
    myobj = {'name': "nbnbnb" , 
           'model': "request.form['model']",
           'description': "request.form['description']",
           'edition_number': "5",
           'quantity': "1000",
           'amount_sold': "8",
           'price': "4",  
           'raiting': "5", 
           'author': "request.form['author']", 
           'warranty': "request.form['warranty']", 
           'distributor_Information': "request.form['distributor_Information']",   
           'sale': "0.5", 
           'picture_url0': "request.form['picture_url0']", 
           'picture_url1': "request.form['picture_url1']", 
           'picture_url2': "request.form['picture_url2']",
           'Pcid': "1",
           'Sid': "1",
           'Pmid': "1"
           
    }    #test  pass_hash homeadress /signup/submit
    
    #teardown 
    req.post(url, data = json.dumps(myobj))
    allproducts=Products.query.filter_by().all()
    pidvalues = []
    for i in allproducts:
        pidvalues.append(i.Pid)
    maxPid=max(pidvalues) 
   
        
    url = 'http://127.0.0.1:5000/decreasestock/submit'
  
    myobj = {"Pid":str(maxPid) , "quantity":"100" } #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()

    underDelete = db.session.query(under)\
        .filter(under.c.Pid ==  int(maxPid) )\
          .delete()    
    managesDelete = db.session.query(manages)\
        .filter(manages.c.Pid ==  int(maxPid) )\
          .delete()     
    changePrice = db.session.query(change_price)\
        .filter(change_price.c.Pid ==  int(maxPid) )\
          .delete()                           
    productsdelete = db.session.query(Products)\
        .filter(Products.Pid == int(maxPid))\
            .delete()
    db.session.commit()    
    return stat       

def unit_test11():    #checks stock decrease function. first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/Products_reg/submit'
    myobj = {'name': "nbnbnb" , 
           'model': "request.form['model']",
           'description': "request.form['description']",
           'edition_number': "5",
           'quantity': "1000",
           'amount_sold': "8",
           'price': "4",  
           'raiting': "5", 
           'author': "request.form['author']", 
           'warranty': "request.form['warranty']", 
           'distributor_Information': "request.form['distributor_Information']",   
           'sale': "0.5", 
           'picture_url0': "request.form['picture_url0']", 
           'picture_url1': "request.form['picture_url1']", 
           'picture_url2': "request.form['picture_url2']",
           'Pcid': "1",
           'Sid': "1",
           'Pmid': "1"
           
    }    #test  pass_hash homeadress /signup/submit
    
    #teardown 
    req.post(url, data = json.dumps(myobj))
    allproducts=Products.query.filter_by().all()
    pidvalues = []
    for i in allproducts:
        pidvalues.append(i.Pid)
    maxPid=max(pidvalues) 
   
        
    url = 'http://127.0.0.1:5000/decreasestock/submit'
  
    myobj = {"Pid":str(maxPid) , "quantity":"10000" } #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": false}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()

    underDelete = db.session.query(under)\
        .filter(under.c.Pid ==  int(maxPid) )\
          .delete()    
    managesDelete = db.session.query(manages)\
        .filter(manages.c.Pid ==  int(maxPid) )\
          .delete()     
    changePrice = db.session.query(change_price)\
        .filter(change_price.c.Pid ==  int(maxPid) )\
          .delete()                           
    productsdelete = db.session.query(Products)\
        .filter(Products.Pid == int(maxPid))\
            .delete()
    db.session.commit()    
    return stat   

if __name__ == "__main__":
    print("unit_test1" , unit_test1() )
    print("unit_test2" , unit_test2() )
    print("unit_test3" , unit_test3() )
    print("unit_test4" , unit_test4() )
    print("unit_test5" , unit_test5() )
    print("unit_test6" , unit_test6() )
    print("unit_test7" , unit_test7() )
    print("unit_test8" , unit_test8() )
    print("unit_test9" , unit_test9() )
    print("unit_test10" , unit_test10() )
    print("unit_test11" , unit_test11() )


