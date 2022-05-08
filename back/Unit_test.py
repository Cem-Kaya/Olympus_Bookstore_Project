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
  
    myobj = {'text': "request.form['text']1" , 
           'stars': "3"
    }   #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    deletecomment = db.session.query(Comment)\
        .filter(Comment.text ==  "request.form['text']1" )\
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

def unit_test12():    #checks if comments relation submit is working well comments/submit 
    
   
    url = 'http://127.0.0.1:5000/Comment_all_/submit'
    myobj = {'text': "request.form['text']6" , 
           'stars': "3",
          'Pid': "1" ,
          'email':"a@a.com"
    } #test  pass_hash homeadress /signup/submit
    stat =False
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
        stat =True    
    
    allcommentsss=Comment.query.filter_by().all()
    cidvalues = []
    for i in allcommentsss:
        cidvalues.append(i.cid)
    maxcid=max(cidvalues)   
    #print(maxcid)

 
    #teardown 
    #Customers.query.filter_by(email=email).all()
    #db.session.query(Comments).filter(Comments.comment_id == maxcid).delete()
    commentsDelete = db.session.query(Comments)\
        .filter(Comments.comment_id ==  (maxcid) )\
        .delete()       
    commentdelete = db.session.query(Comment)\
        .filter(Comment.cid == maxcid)\
        .delete()    

    db.session.commit()      

  
    return stat   

def unit_test13():    #checks checkstock function for true values. first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/Products_reg/submit'
    myobj = {'name': "nbfsdfnbnb" , 
           'model': "requesdfsst.form['model']",
           'description': "requesfsdfsdt.form['description']",
           'edition_number': "5",
           'quantity': "100",
           'amount_sold': "85",
           'price': "54",  
           'raiting': "5", 
           'author': "request.form['fdsauthor']", 
           'warranty': "request.formfds['warranty']", 
           'distributor_Information': "requedsfst.form['distributor_Information']",   
           'sale': "0.5", 
           'picture_url0': "request.forfdsm['picture_url0']", 
           'picture_url1': "request.fofsdfrm['picture_url1']", 
           'picture_url2': "request.fosdfrm['picture_url2']",
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
   
        
    url = 'http://127.0.0.1:5000/check_stock/submit'
  
    myobj = {"Pid":str(maxPid) } #test  pass_hash homeadress /signup/submit
    stat =False
    #print(req.post(url, data = json.dumps(myobj)).text)
    if req.post(url, data = json.dumps(myobj)).text == '{"status": true, "quantity": "100"}':
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

def unit_test14():    #checks checkstock function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    

   
        
    url = 'http://127.0.0.1:5000/check_stock/submit'
  
    myobj = {"Pid":str(-100) } #test  pass_hash homeadress /signup/submit
    stat =False
    #print(req.post(url, data = json.dumps(myobj)).text)
    if req.post(url, data = json.dumps(myobj)).text == '{"status": false, "quantity": null}':
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()

    return stat        

def unit_test15():    #checks product manager registration function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/Product_manager_reg/submit'
    myobj = {'name': "requefdsst.form['name']" , 
           'pass_hash': "requesfsdt.form['pass_hash']",
    }
    #req.post(url, data = json.dumps(myobj))
    text = req.post(url, data = json.dumps(myobj)).text
    allproductmanagers = db.session.query(Product_Manager).all()
    pidvalues = []
    if(len(allproductmanagers) == 0):
        pidvalues.append(int(1))
    else:
        for i in allproductmanagers:
            pidvalues.append(i.Pmid)
    maxPmid=max(pidvalues)
        
    stat =False
    answer = "{" + '"status"' + ": true, " + '"Pmid": ' + str(maxPmid) + "}"
    #print(answer)
    #print(req.post(url, data = json.dumps(myobj)).text)
    #if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
    if text == answer:
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    productsmdelete = db.session.query(Product_Manager)\
        .filter(Product_Manager.Pmid == int(maxPmid))\
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
    print("unit_test12" , unit_test12() )
    print("unit_test13" , unit_test13() )
    print("unit_test14" , unit_test14() )
    print("unit_test15" , unit_test15() )
