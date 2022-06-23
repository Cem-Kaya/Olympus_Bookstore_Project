
from os import lstat
from app import * 
import requests as req
import json
import os.path
from test_email2 import *
from test_email import *


########################################################################################################################################################################
########################################################################################################################################################################
########################################################################################################################################################################
########################################################################################################################################################################
#Rest of the unit test cases are in the front end!
#Rest of the unit test cases are in the front end!
#Rest of the unit test cases are in the front end!
#Rest of the unit test cases are in the front end!
#Rest of the unit test cases are in the front end!
########################################################################################################################################################################
########################################################################################################################################################################
########################################################################################################################################################################
########################################################################################################################################################################



def deleteUser():
    buyDlistDelete = db.session.query(Buy_Dlist)\
        .filter(Buy_Dlist.did ==  int(89) )\
        .delete()  

    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()            


def unit_test1():
    #build up 
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN", "tax_id": "12321123"   }
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
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN", "tax_id": "12321123"    }
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
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": "123" , "homeadress":"SUN", "tax_id": "12321123"    }
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
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": "123" , "homeadress":"SUN", "tax_id": "12321123"    }
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

def unit_test16():    #checks product category registration function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/Product_Catogary_reg/submit'
    myobj = {'name': "reqfdsuest.form['name']" 
    }
    #req.post(url, data = json.dumps(myobj))
    text = req.post(url, data = json.dumps(myobj)).text
    allproductmanagers = db.session.query(Product_Category).all()
    Pcidvalues = []
    if(len(allproductmanagers) == 0):
        Pcidvalues.append(int(1))
    else:
        for i in allproductmanagers:
            Pcidvalues.append(i.Pcid)
    maxPmid=max(Pcidvalues)
        
    stat =False
    answer = "{" + '"status"' + ": true" + "}"
    #print(answer)
    #print(req.post(url, data = json.dumps(myobj)).text)
    #if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
    if text == answer:
        stat =True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    productsmdelete = db.session.query(Product_Category)\
        .filter(Product_Category.Pcid == int(maxPmid))\
            .delete()    
    db.session.commit()         

    return stat  
    

def unit_test17():    #checks to purchase function with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test1" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN", "tax_id": "12321123" }
    
    #we create a user with this request
    req.post(url, data = json.dumps(myobj))
          
    allbuy_dlists = db.session.query(Buy_Dlist).all()
    didvalues = []
    if(len(allbuy_dlists) == 0):
        return "1"
    for i in allbuy_dlists:
        didvalues.append(i.did)
    myDid=max(didvalues)+1 #actually max+1
    #mydid = str(maxDid)
  
    url = 'http://127.0.0.1:5000/to_purchase/submit'
    myobj = {'quantity': "5",
            'price': "23",
            'sale': "1",
            'email': "test@test.test1",
            'Pid': "1",
            'did': str(myDid)
            }
    #we use to_purchase functionality with this request
    text = req.post(url, data = json.dumps(myobj)).text       

    all_purchased = db.session.query(Purchased).all()
    purcidvalues = []

    for i in all_purchased:
        purcidvalues.append(i.purcid)
    myPurcid=max(purcidvalues) #will be used to delete
    #mydid = str(maxDid)

        
    stat =False
    answer = "{" + '"status"' + ": true" + "}"
    print(answer)
    print(text)

    #print(answer)
    #print(req.post(url, data = json.dumps(myobj)).text)
    #if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
    if text == answer:
        stat =True    
    #########TEARDOWN 
    #Customers.query.filter_by(email=email).all()

    buyDlistDelete = db.session.query(Buy_Dlist)\
        .filter(Buy_Dlist.did ==  int(myDid) )\
        .delete()  
        
    buyDlistDelete = db.session.query(Buy_Dlist)\
        .filter(Buy_Dlist.customer_email ==  "test@test.test1" )\
        .delete()  
        
    productsmdelete = db.session.query(Purchased)\
        .filter(Purchased.purcid == int(myPurcid))\
            .delete()    

    #Delete the user created
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test1")\
            .delete()
    db.session.commit()                  
            

    return stat  

def unit_test18():    #checks wishing functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test15" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN", "tax_id": "12321123"}
    
    #we create a user with this request
    req.post(url, data = json.dumps(myobj))
          
  
    url = 'http://127.0.0.1:5000/Wishes/submit'
    myobj = {
            'Pid': "1",
            'email': "test@test.test15"
            }
    #we use to_purchase functionality with this request
    text = req.post(url, data = json.dumps(myobj)).text       

        
    stat =False
    answer = "{" + '"status"' + ": true" + "}"
    #print(answer)
    #print(req.post(url, data = json.dumps(myobj)).text)
    #if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
    if text == answer:
        stat =True    
    #########TEARDOWN 
    #Customers.query.filter_by(email=email).all()

    underDelete = db.session.query(wishes)\
        .filter(wishes.c.email ==  "test@test.test15" )\
          .delete()    


    #Delete the user created
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test15")\
            .delete()
    db.session.commit()                  
            

    return stat      

def unit_test19():    #checks solely the under functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/Products_reg/submit'
    myobj = {'name': "nbfsfdsdfnbnb" , 
           'model': "requefdssdfsst.form['model']",
           'description': "requefdssfsdfsdt.form['description']",
           'edition_number': "5",
           'quantity': "1200",
           'amount_sold': "185",
           'price': "554",  
           'raiting': "3", 
           'author': "request.form['fdsfdsauthor']", 
           'warranty': "request.formsdffds['warranty']", 
           'distributor_Information': "requedsfdsfst.form['distributor_Information']",   
           'sale': "0.7", 
           'picture_url0': "request.forfdsfdsm['picture_url0']", 
           'picture_url1': "request.fofsdfrfdsm['picture_url1']", 
           'picture_url2': "request.fosdffdsrm['picture_url2']",
           'Pcid': "1",
           'Sid': "1",
           'Pmid': "1"
           
    }    #test  pass_hash home
    req.post(url, data = json.dumps(myobj))
    allproducts=Products.query.filter_by().all()
    pidvalues = []
    for i in allproducts:
        pidvalues.append(i.Pid)
    maxPid=max(pidvalues) 

    url = 'http://127.0.0.1:5000/Under/submit'
    myobj = {'Pid': str(maxPid) ,"Pcid":"1"}
    
    #we create a under relationship with this request
  

        
    stat =False

    #print(answer)
    #print(req.post(url, data = json.dumps(myobj)).text)
    #if req.post(url, data = json.dumps(myobj)).text == '{"status": true}':
    if req.post(url, data = json.dumps(myobj)):
        stat =True    
    #########TEARDOWN 
    #Customers.query.filter_by(email=email).all()

    underDelete = db.session.query(under)\
        .filter(under.c.Pid ==  int(maxPid) )\
          .delete()    

    ###now delete product's relations
   
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

def unit_test20():    #checks if next did functions correctly functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/getnextdid'
    myobj = { }    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.get(url, data = json.dumps(myobj)):
        stat = True
   
    return stat
    
def unit_test21():    #checks change_price functionality functions correctly functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    url = 'http://127.0.0.1:5000/Products_reg/submit'
    myobj = {'name': "nbfsfdsfdsdfnbnb" , 
           'model': "requefdssdfdsfsst.form['model']",
           'description': "requefdssfsfdsdfsdt.form['description']",
           'edition_number': "5",
           'quantity': "10",
           'amount_sold': "185",
           'price': "554",  
           'raiting': "3", 
           'author': "request.form['fdsfdsauthor']", 
           'warranty': "request.formsdffds['warranty']", 
           'distributor_Information': "requedsfdsfst.form['distributor_Information']",   
           'sale': "0.7", 
           'picture_url0': "request.forfdsfdsm['picture_url0']", 
           'picture_url1': "request.fofsdfrfdsm['picture_url1']", 
           'picture_url2': "request.fosdffdsrm['picture_url2']",
           'Pcid': "1",
           'Sid': "1",
           'Pmid': "1"
           
    }    #test  pass_hash home
    req.post(url, data = json.dumps(myobj))
    allproducts=Products.query.filter_by().all()
    pidvalues = []
    for i in allproducts:
        pidvalues.append(i.Pid)
    maxPid=max(pidvalues) 

    url = 'http://127.0.0.1:5000/Change_price/submit'
    myobj = { 'Pid': str(maxPid) ,'Sid': "2"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True

    underDelete = db.session.query(under)\
        .filter(under.c.Pid ==  int(maxPid) )\
          .delete()    

    ###now delete product's relations
   
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

def unit_test22():    #checks all books if next did functions correctly functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/all_books'
    myobj = { }    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.get(url):
        stat = True
   
    return stat
    
def unit_test23():    #checks all books if next did functions correctly functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/all_books_category_ranged/submit'
    myobj = {"min": "0",
             "max": "100",
             "Pcid": "1" }    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    return stat
    
def unit_test24():    #checks all books if next did functions correctly functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    url = 'http://127.0.0.1:5000/all_books_ranged/submit'
    myobj = {"min": "0",
             "max": "100"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    return stat


def unit_test25():    #checks all books if next did functions correctly functionality, first creates a product then puts it under a category functionality with a created user function for pid s not in store. rest is omitted first create a dummy product and decrease stock, if successful return true and tear it down 
    
    myPDF = make_pdf("denemetexti")
    #print(myPDF)
    
    stat = os.path.exists(myPDF)
    os.remove(myPDF)
    

    return stat
    

def unit_test26():
    try: 
        time.sleep(2)
        first=read_email_from_gmail()
        time.sleep(2)
        send_email("miyavcs308group4@gmail.com","Unit test of email sevice this shell break it self in 30 days ")
        time.sleep(2)

        lstat=read_email_from_gmail()
        #print(lstat)
        #print(first)
        if (lstat - first) == 1:
            return True
    except:
        return False
    
def unit_test27():
    url = 'http://127.0.0.1:5000/get_all_approved_comments/submit'
    myobj = {"Pid": "1"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    return stat

def unit_test28():
    url = 'http://127.0.0.1:5000/get_comments_for_approval/submit'
    myobj = {"Pmid": "1"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    return stat

def unit_test29():
    #will check our cusotmer info getter function when it gets the right input
    
    #build up a customer
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN", "tax_id": "12321123"   }
    #test  pass_hash homeadress /signup/submit
    req.post(url, data = json.dumps(myobj))
    #test customer getter
    url = 'http://127.0.0.1:5000/customer_info/submit'
    myobj = {"email": "test@test.test"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    #tear down
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat            

def unit_test30():
    #will check our wish list for given cusotmer function 
    
    #build up a customer
    url = 'http://127.0.0.1:5000/signup/submit'
    myobj = {'email': "test@test.test" ,"name":"unit test","pass_hash": 123 , "homeadress":"SUN", "tax_id": "12321123"   }
    #test  pass_hash homeadress /signup/submit
    req.post(url, data = json.dumps(myobj))
    #test customer getter
    url = 'http://127.0.0.1:5000/Wishes_get_email/submit'
    myobj = {"email": "test@test.test"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    #tear down
    allUnders = db.session.query(Customers)\
        .filter(Customers.email == "test@test.test")\
            .delete()
    db.session.commit()      
    return stat                    
    
def unit_test31():
    #will check our delivery list getter function function when it gets the right input
    
    url = 'http://127.0.0.1:5000/pmid_deliverylist/submit'
    myobj = {"Pmid": "1"}    #test  pass_hash home
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    
    return stat     

def unit_test32():
    #will check sales manager registration function
     
    
    url = 'http://127.0.0.1:5000/Sales_manager_reg/submit'
    myobj = {'name': "test2" ,"pass_hash":"123"}
    stat = False
    text = req.post(url, data = json.dumps(myobj)).text 
    sm_ex_check = db.session.query(Sales_Manager)\
        .filter(Sales_Manager.name == "test2" ).first()
    # print(req.get(url, data = json.dumps(myobj)))
    mySid = int(sm_ex_check.Sid)
    
    allUnders = db.session.query(Sales_Manager)\
        .filter(Sales_Manager.Sid == sm_ex_check.Sid)\
            .delete()
    db.session.commit()         
    answer = "{" + '"status"' + ": true, " + '"sid": ' + str(mySid) + "}"
    if text == answer:
        stat =True        
    return stat            
       
def unit_test33():
    #will check getter that lists refund objects a particular sales manager has is responsible for     
    
    url = 'http://127.0.0.1:5000/Sales_manager_reg/submit'
    myobj = {'name': "test4" ,"pass_hash":"123"}
    stat = False
    text = req.post(url, data = json.dumps(myobj)).text 
    sm_ex_check = db.session.query(Sales_Manager)\
        .filter(Sales_Manager.name == "test4" ).first()
    # print(req.get(url, data = json.dumps(myobj)))
    mySid = int(sm_ex_check.Sid)
    url = 'http://127.0.0.1:5000/refunds_get_sid/submit'
    myobj = {"Sid": mySid}    
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True   
    
    allUnders = db.session.query(Sales_Manager)\
        .filter(Sales_Manager.Sid == sm_ex_check.Sid)\
            .delete()
    db.session.commit()         
    
    return stat     

def unit_test34():
    #will check what happens if i try to create sales manager with same name, it shouldn't allow it     
    
    url = 'http://127.0.0.1:5000/Sales_manager_reg/submit'
    myobj = {'name': "test4" ,"pass_hash":"123"}
    stat = False
    text = req.post(url, data = json.dumps(myobj)).text 
    sm_ex_check = db.session.query(Sales_Manager)\
        .filter(Sales_Manager.name == "test4" ).first()
    # print(req.get(url, data = json.dumps(myobj)))
    mySid = int(sm_ex_check.Sid)
    text = req.post(url, data = json.dumps(myobj)).text
    allUnders = db.session.query(Sales_Manager)\
        .filter(Sales_Manager.Sid == sm_ex_check.Sid)\
            .delete()
    db.session.commit()         
    answer = "{" + '"status"' + ": false, " + '"sid": ' + "null" + "}"
    
    if text == answer:
        stat =True        
    return stat     

def unit_test35():    #checks product manager refund getter function  
    
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
    url = 'http://127.0.0.1:5000/products_pmid/submit'
    myobj = {"Pmid": maxPmid}    
    stat = False
    # print(req.get(url, data = json.dumps(myobj)))
    if req.post(url, data = json.dumps(myobj)):
        stat = True    
    #teardown 
    #Customers.query.filter_by(email=email).all()
    productsmdelete = db.session.query(Product_Manager)\
        .filter(Product_Manager.Pmid == int(maxPmid))\
            .delete()    
    db.session.commit()         

    return stat  


def nan_functional_req():
    url = 'http://127.0.0.1:5000/all_books'
    stat = True
    tx1=req.get(url).text
    for _ in range(1000):
        if tx1 != req.get(url).text: #if gets error or not the original json it shell return false ! 
            stat = False
    return stat

if __name__ == "__main__":

    debug = False
    if(debug):
        #deleteUser()
        print("unit_test35" , unit_test35() )
    else:    

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
        print("unit_test16" , unit_test16() )
        print("unit_test17" , unit_test17() )
        print("unit_test18" , unit_test18() )
        print("unit_test19" , unit_test19() )
        print("unit_test20" , unit_test20() )
        print("unit_test21" , unit_test21() )
        print("unit_test22" , unit_test22() )
        print("unit_test23" , unit_test23() )
        print("unit_test24" , unit_test24() )    
        print("unit_test25" , unit_test25() )    
        print("unit_test26" , unit_test26() ) 
        print("unit_test27" , unit_test27() )
        print("unit_test28" , unit_test28() )
        print("unit_test29" , unit_test29() )
        print("unit_test30" , unit_test30() )
        print("unit_test31" , unit_test31() ) 
        print("unit_test32" , unit_test32() )
        print("unit_test33" , unit_test33() )
        print("unit_test34" , unit_test34() )
        print("unit_test35" , unit_test35() )
        print("Rest of the unit test cases are in the front end")

    
    
   
        print("None functional requirement test 1000 client connection test " ,nan_functional_req())


    
