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
    #Customers.query.filter_by(email=email).all()
  
    return stat


if __name__ == "__main__":
    print("unit_test1" , unit_test1() )
    print("unit_test2" , unit_test2() )
    print("unit_test3" , unit_test3() )
    print("unit_test4" , unit_test4() )
    print("unit_test5" , unit_test5() )
    print("unit_test6" , unit_test6() )


