import json
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import requests as req
from DB_init_SQL import * 
import crypto_funcs 

 
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123123@localhost/STORE'

db=SQLAlchemy(app)

if __name__ =="__main__":
    custs =[]
    custs.append(Customers("Cem Kaya",crypto_funcs.hast_ist("123") ,"a@a.com","Barbaros, Ihlamur Bv 4B D:1, 34746 Atasehir/Istanbul", "412355123") )
    custs.append(Customers("Baha Mert Ersoy",crypto_funcs.hast_ist("123") ,"b@b.com","Akat, Tepecik Yolu Alkent Sitesi 22 / 14, 34340 Besiktas / Etiler/Besiktas/Istanbul", "123215612") )
    custs.append(Customers("Ugur Kagan Cakir",crypto_funcs.hast_ist("123") ,"u@u.com","Mahir Iz Cad. No:3 Altunizade Capitol AVM  Uskudar, Istanbul", "1231256123") )
    for cs in custs:
        db.session.add(cs)        
    #db.session.commit()

    product_managers = []
    product_managers.append(Product_Manager("Cemal Yilmaz",123) )
    product_managers.append(Product_Manager("Anes Abdennebi",123) )
    for pm in product_managers:
        db.session.add(pm)        
    #db.session.commit()
    
    sales_managers = []
    sales_managers.append(Sales_Manager("Murat Karaca",123) )
    sales_managers.append(Sales_Manager("Emre Can Eski",123) )
    for sm in sales_managers:
        db.session.add(sm)        
    #db.session.commit()
        
    product_categories = []
    product_categories.append(Product_Category("Novel"))
    product_categories.append(Product_Category("Non-fiction"))
    product_categories.append(Product_Category("Manga"))
    product_categories.append(Product_Category("Woodworking"))
    product_categories.append(Product_Category("Light Novel"))
    product_categories.append(Product_Category("Drama"))
    for pc in product_categories:
        db.session.add(pc)        
    #db.session.commit()   


    

    custs =[]
    custs.append(Products("everything is lies","2017","ogrenci adam calisi uwu", 2
              ,15, 0, 25.6, 1, "pain", "old people", "author", 1, "https://images-na.ssl-images-amazon.com/images/I/91u-yVVUc1L.jpg"
              ,"https://images-na.ssl-images-amazon.com/images/I/91u-yVVUc1L.jpg","https://images-na.ssl-images-amazon.com/images/I/91u-yVVUc1L.jpg"))
    custs.append(Products("ali baba nin evi","2003","ali babanin bir cifligi var ","1" ,5, 11, 99, 2 , "warranty is not included", "distributor_Information by ali baba himself", "ali baba", 1,
              "https://i.dr.com.tr/cache/600x600-0/originals/0001848767001-1.jpg","https://i.dr.com.tr/cache/600x600-0/originals/0001848767001-1.jpg","https://i.ytimg.com/vi/PH90fAuY3YA/maxresdefault.jpg"))


    custs.append(Products("Every tool is Hammer",1,"Adam savage talks about making a lot of stuff  ",1
              ,1, 1, 1, 4, "1", "teleportation ", "Adam Savage", 1,
              "https://images-na.ssl-images-amazon.com/images/I/8156hWGz2LL.jpg","https://www.kids-world.com/images/XF543.jpg","https://i.pinimg.com/736x/2f/bb/1d/2fbb1dba5d7088de47fe415c0d38d32b--nail-quotes-tool.jpg"))
    
  
    custs.append(Products("Me Before You","2010","Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, saepe voluptates suscipit repudiandae vero nulla iure. Voluptate cum odit animi?",
      1,200 , 0 , 99 , 1 , "no vorinty ", "ucuz kargo ", "Jojo Moyes" , 1,"https://www.bookeditingservices.co.uk/uploads/1/0/2/8/102824878/editor/download-1.jpg?1575752539"
              ,"https://www.bookeditingservices.co.uk/uploads/1/0/2/8/102824878/editor/download-1.jpg?1575752539","https://www.bookeditingservices.co.uk/uploads/1/0/2/8/102824878/editor/download-1.jpg?1575752539"))
      
     
    custs.append(Products("Lead by Example","pdf" ,"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, saepe voluptates suscipit repudiandae vero nulla iure. Voluptate cum odit animi? ",2
              ,999, 1, 55, 4, "its a pdf so infinite re downloads ", "email ", "John Baldoni", 1,
              "https://images-na.ssl-images-amazon.com/images/I/6177mRK8WuL.jpg","https://images-na.ssl-images-amazon.com/images/I/6177mRK8WuL.jpg","https://images-na.ssl-images-amazon.com/images/I/6177mRK8WuL.jpg")
    )
    custs.append(Products("Blue Book of Grammar and Punctuation","best version ","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",21
              ,15, 7, 357 , 5, "Leading Ones Garantili", "pahali karho ve hizli ", "JOSSEY-BASS", 0.9,
              "https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxdnNXU2hZZnZMLl9TUzQwMF8uanBn.jpg","https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxdnNXU2hZZnZMLl9TUzQwMF8uanBn.jpg","https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxdnNXU2hZZnZMLl9TUzQwMF8uanBn.jpg")
    )
      
    custs.append(Products("Insanlar","omicron","it is a good book dome would say a great book but isnt every book a great book or somem books are better then others. in this art pice the author makes sure that his book is great and good ",2563
              ,852465, 2222222, 111111, 5, "Lorem, ipsum dolor ", "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, saepe voluptates suscipit repudianda", "Matt Haig", 5,
              "https://i.idefix.com/cache/600x600-0/originals/0001969669001-1.jpg","https://i.idefix.com/cache/600x600-0/originals/0001969669001-1.jpg","https://i.idefix.com/cache/600x600-0/originals/0001969669001-1.jpg")
    )
    custs.append(Products("Anka Kusu","111111","Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem explicabo commodi, alias dignissimos neque ratione. Neque nobis quas dolor omnis animi possimus hic est blanditiis reiciendis? Suscipit adipisci dolor ea molestias veritatis odio iste cupiditate odit nobis molestiae dignissimos, doloribus natus, quas dolorem. Ea officiis architecto facilis, sapiente nostrum, reprehenderit, aut non mollitia est maxime animi earum sint minus velit? Quae numquam quaerat aperiam optio! Sunt consequuntur, ea vel similique deleniti consequatur, necessitatibus dicta nisi blanditiis hic assumenda suscipit, nihil reprehenderit. Odit facilis nihil soluta unde in deleniti fugit officia ex tenetur exercitationem cum, voluptatem quae accusantium consequatur provident minima repellat ut sed cumque dicta voluptate velit, dolorem sint! Tenetur consectetur consequatur in nisi et quidem iusto reiciendis, saepe nesciunt repellendus impedit! Sint ipsum magni temporibus eligendi quidem culpa illum incidunt voluptas nulla sit ad corporis mollitia libero, voluptatum eveniet fugiat, consequatur eaque quos voluptatibus ut omnis vitae ratione minima? Ut veritatis doloremque asperiores, at laborum reiciendis ad laboriosam quibusdam iusto molestiae id quaerat dolorum odio minima quis voluptatibus est? Alias quisquam maiores, ipsam natus labore nemo exercitationem dolor error odio voluptatibus sed perspiciatis iusto tempora minima corrupti commodi inventore ipsum animi, beatae at eos nam unde veritatis? Commodi exercitationem maxime aliquid veritatis, aut tenetur explicabo corporis cum autem libero labore. Accusantium quo illo suscipit odit dolorum blanditiis ipsam consequatur illum architecto iusto soluta deserunt, eius porro voluptate perferendis ratione. Nam laboriosam autem rem. Adipisci odio similique nihil debitis, modi voluptas aliquid error soluta quia quae, obcaecati et veritatis aspernatur incidunt id cumque. Et illo harum modi, ratione ullam odit culpa magnam omnis officia quasi eaque adipisci facere distinctio. Reprehenderit, rerum expedita, saepe ipsa non eius quasi quos facere excepturi aut voluptatum? Enim illo qui dolorum reprehenderit quaerat blanditiis animi quia voluptatibus placeat! Delectus molestiae vel iusto fugit pariatur.",3
              ,11, 1, 9999, 2, "the author shell write e new copy if you lose yours ", "flying ducks shell drop this book to the buyers hands or flying drones ", "Yilmaz 0zdir", 1,
              "https://i.idefix.com/cache/600x600-0/originals/0001969835001-1.jpg","https://i.idefix.com/cache/600x600-0/originals/0001969835001-1.jpg","https://i.idefix.com/cache/600x600-0/originals/0001969835001-1.jpg")
    )
    custs.append(Products("A-71",71 ,"a book about the fastest plane ever ",11
              ,71 , 71 , 71, 3.71, "71 years", "an A71 will drop it ", "Iskender Pala", 0.4,
              "https://i.idefix.com/cache/600x600-0/originals/0001955659001-1.jpg","https://i.idefix.com/cache/600x600-0/originals/0001955659001-1.jpg","https://i.idefix.com/cache/600x600-0/originals/0001955659001-1.jpg")
    )
    
    custs.append(Products("Attack on the Titan ",1 ,"A giant man is killed by his lover while he is rumbling. before this the man tries to kill every human who is alive exeptc his countrymen",1
              ,100, 100, 100, 5, "Shingeki no Kyojin", "japaniese plane ", "isayama", 0.5,
              "https://cdn.statically.io/img/static.kissanimefree.cc/poster/shingeki-no-kyojin-the-final-season-part-2-dub.jpg","https://cdn.statically.io/img/static.kissanimefree.cc/poster/shingeki-no-kyojin-movie-2-jiyuu-no-tsubasa.jpg","https://en.wikipedia.org/wiki/File:Shingeki_no_Kyojin_manga_volume_1.jpg")
    )
    custs.append(Products("The Complete Book of Woodworking: Step-by-step Guide to Essential Woodworking Skills, Techniques and Tips",
        "2001",
        "The Complete Book of Woodworking is a comprehensive guide to help you become a master woodworker and have a house full of hand-made furnishings to show for the effort! Set up shop, understand the tools, learn the principles of basic design, and practice essential woodworking techniques as you complete 40 detailed plans for home accessories, furnishings, outdoor projects, workshop projects, and more! With over 1,200 full-color photographs, step-by-step instructions and illustrations, and helpful diagrams, woodworkers of all levels will enjoy enhancing their skills and learning something new!",
        3,
        55, 
        11, 
        65, 
        4, 
        "Fox Garantisi", 
        "Fox Chapel Publishing Company, Incorporated", 
        "Tom Carpanter, Mark Johanson", 
        1.0,
        "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B550%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780980068870_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
        "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B550%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780980068870_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
        "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B550%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780980068870_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
    ))
      
    
    custs.append( Products("Balikci ve Oglu",
        "2021",
        "Hristiyan, Yahudi, Musluman ve Hindu geleneklerinden 8 ulkeden 50 bilim insani, psikolog, teolog ve filozof, elinizdeki kitapta bu sorularin cevaplarini ariyor. Bu kitap bilim ve din konusunda kafasi karisiklar icin rehber niteligindedir. Bu urunden 707 adet satin alinmistir.",
        12,
        42, 
        12, 
        43, 
        2, 
        "Balikci Kitapevi Garantisi", 
        "Inkilap Yayincilik", 
        "Zulfu Livaneli", 
        1.0,
        "https://i.idefix.com/cache/600x600-0/originals/0001921956001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001921956001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001921956001-1.jpg"
    ))
  
    custs.append(Products("Kafkaesk - On Dort Oyk",
        "2021",
        "Yirminci yuzyilin en onemli edebi figurlerinden biri olan Franz Kafka kusaklar boyunca pek cok yazar ve sanatciyi derinden etkiledi; oyku ve romanlari edebiyat, muzik, resim, heykel, dans ve film gibi cok cesitli alanlarda sayisiz esere ilham kaynagi oldu. Kafka yi 1988 yilindan beri cizgi romana tercume eden gorsel sanatci Peter Kuper in uyarlamalari da bu eserlerin arasinda degerli bir yere sahip. ",
        2,
        125, 
        53, 
        28, 
        5, 
        "Opera Kitapevi Garantisi", 
        "Metis Yayincilik", 
        "Peter Kuper", 
        1.0,
        "https://i.idefix.com/cache/600x600-0/originals/0001968192001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001968192001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001968192001-1.jpg"
    ))      
    
    custs.append(Products("21. Yuzyil Icin Tanri",
        "2021",
        "Hristiyan, Yahudi, Musluman ve Hindu geleneklerinden 8 ulkeden 50 bilim insani, psikolog, teolog ve filozof, elinizdeki kitapta bu sorularin cevaplarini ariyor. Bu kitap bilim ve din konusunda kafasi karisiklar icin rehber niteligindedir. Bu urunden 707 adet satin alinmistir.",
        2,
        13, 
        4, 
        55, 
        5, 
        "ODTU Kitapevi Garantisi", 
        "Fol Kitap", 
        "Kolektif", 
        1.0,
        "https://i.idefix.com/cache/600x600-0/originals/0001967981001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001967981001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001967981001-1.jpg"
    ))      
   
    custs.append(Products("Sapiens",
        "2021",
        "Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 based on a series of lectures Harari taught at The Hebrew University of Jerusalem, and in English in 2014",
        7,
        55, 
        12, 
        45, 
        5, 
        "New York Royal Academy Kitapevi Garantisi", 
        "Kolektif Kitap", 
        "Yuval Noah Harari", 
        1.0,
        "https://i.idefix.com/cache/600x600-0/originals/0001969529001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001969529001-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0001969529001-1.jpg"
    ))        
   


    custs.append(Products("Uluslarin Dususu",
        "2021",
        "Why Nations Fail: The Origins of Power, Prosperity, and Poverty, first published in 2012, is a book by economists Daron Acemoglu and James Robinson. It summarizes and popularizes previous research by the authors and many other scientists.",
        2,
        50, 
        3, 
        26, 
        4, 
        "Istanbul Kitapevi Garantisi", 
        "Dogan Kitap", 
        "Daron Acemoglu, James Robinson", 
        1.0,
        "https://i.idefix.com/cache/600x600-0/originals/0000000572949-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0000000572949-1.jpg",
        "https://i.idefix.com/cache/600x600-0/originals/0000000572949-1.jpg"
    ))

    custs.append(Products("Classroom of the Elite (Light Novel) Vol. 1",
        "2019",
        "Students of the prestigious Tokyo Metropolitan Advanced Nurturing High School are given remarkable freedom - if they can win, barter, or save enough points to work their way up the ranks! Ayanokoji Kiyotaka has landed at the bottom in the scorned Class D, where he meets Horikita Suzune, who's determined to rise up the ladder to Class A. Can they beat the system in a school where cutthroat competition is the name of the game?",
        1,
        99, 
        100, 
        350, 
        5, 
        "Seven Seas Light Novels", 
        "Seven Seas", 
        "Syougo Kinugasa", 
        0.5,
        "https://m.media-amazon.com/images/I/511n9ZRT8pL._AC_SY780_.jpg",
        "https://m.media-amazon.com/images/I/511n9ZRT8pL._AC_SY780_.jpg",
        "https://m.media-amazon.com/images/I/511n9ZRT8pL._AC_SY780_.jpg"
    ))

    custs.append(Products("That Time I Got Reincarnated as a Slime (Light Novel), Vol. 9",
        "2020",
        "The day has finally come for the Tempest Founder's Festival to kick off! From live concerts to incredible feats of monster engineering (and most of all, the massive labyrinth), revelers are sure to have their minds blown. And who should decide to participate in the battle tournament than the hero himself, Lightspeed Masayuki?!",
        1,
        200, 
        50, 
        150, 
        5, 
        "Yen Press", 
        "Yen Press", 
        "Fuse, Mitz Vah", 
        0.3,
        "https://images-na.ssl-images-amazon.com/images/I/51KkQX4cMML._SX331_BO1,204,203,200_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51KkQX4cMML._SX331_BO1,204,203,200_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51KkQX4cMML._SX331_BO1,204,203,200_.jpg"
    ))       

    
    for cs in custs:
        db.session.add(cs)        
    db.session.commit()


    statement = under.insert().values(Pcid=1, Pid=8)
    db.session.execute(statement)
    db.session.commit() 
    statement = under.insert().values(Pcid=1, Pid=9)
    db.session.execute(statement)
    db.session.commit()     
    statement = under.insert().values(Pcid=1, Pid=2)
    db.session.execute(statement)
    db.session.commit()       
    statement = under.insert().values(Pcid=1, Pid=12)
    db.session.execute(statement)
    db.session.commit()  
    statement = under.insert().values(Pcid=1, Pid=4)
    db.session.execute(statement)
    db.session.commit()      
    statement = under.insert().values(Pcid=2, Pid=1)
    db.session.execute(statement)
    db.session.commit()  
    statement = under.insert().values(Pcid=2, Pid=5)
    db.session.execute(statement)
    db.session.commit()      
    statement = under.insert().values(Pcid=2, Pid=6)
    db.session.execute(statement)
    db.session.commit()  
    statement = under.insert().values(Pcid=2, Pid=7)
    db.session.execute(statement)
    db.session.commit() 
    statement = under.insert().values(Pcid=2, Pid=14)
    db.session.execute(statement)
    db.session.commit()          
    statement = under.insert().values(Pcid=2, Pid=15)
    db.session.execute(statement)
    db.session.commit()    
    statement = under.insert().values(Pcid=2, Pid=16)
    db.session.execute(statement)
    db.session.commit()            
    statement = under.insert().values(Pcid=3, Pid=10)
    db.session.execute(statement)
    db.session.commit() 
    statement = under.insert().values(Pcid=4, Pid=11)
    db.session.execute(statement)
    db.session.commit()     
    statement = under.insert().values(Pcid=4, Pid=3)
    db.session.execute(statement)
    db.session.commit() 
    statement = under.insert().values(Pcid=6, Pid=13)
    db.session.execute(statement)
    db.session.commit()              

    statement = manages.insert().values(Pmid=1, Pid=8)
    db.session.execute(statement)
    db.session.commit() 
    statement = manages.insert().values(Pmid=1, Pid=9)
    db.session.execute(statement)
    db.session.commit()     
    statement = manages.insert().values(Pmid=1, Pid=2)
    db.session.execute(statement)
    db.session.commit()       
    statement = manages.insert().values(Pmid=1, Pid=12)
    db.session.execute(statement)
    db.session.commit()  
    statement = manages.insert().values(Pmid=1, Pid=4)
    db.session.execute(statement)
    db.session.commit()      
    statement = manages.insert().values(Pmid=1, Pid=1)
    db.session.execute(statement)
    db.session.commit()  
    statement = manages.insert().values(Pmid=1, Pid=5)
    db.session.execute(statement)
    db.session.commit()      
    statement = manages.insert().values(Pmid=1, Pid=6)
    db.session.execute(statement)
    db.session.commit()  
    statement = manages.insert().values(Pmid=1, Pid=7)
    db.session.execute(statement)
    db.session.commit() 
    statement = manages.insert().values(Pmid=1, Pid=14)
    db.session.execute(statement)
    db.session.commit()          
    statement = manages.insert().values(Pmid=1, Pid=15)
    db.session.execute(statement)
    db.session.commit()    
    statement = manages.insert().values(Pmid=1, Pid=16)
    db.session.execute(statement)
    db.session.commit()            
    statement = manages.insert().values(Pmid=1, Pid=10)
    db.session.execute(statement)
    db.session.commit() 
    statement = manages.insert().values(Pmid=1, Pid=11)
    db.session.execute(statement)
    db.session.commit()     
    statement = manages.insert().values(Pmid=2, Pid=3)
    db.session.execute(statement)
    db.session.commit() 
    statement = manages.insert().values(Pmid=2, Pid=13)
    db.session.execute(statement)
    db.session.commit()       

    statement = change_price.insert().values(Sid=1, Pid=8)
    db.session.execute(statement)
    db.session.commit() 
    statement = change_price.insert().values(Sid=1, Pid=9)
    db.session.execute(statement)
    db.session.commit()     
    statement = change_price.insert().values(Sid=1, Pid=2)
    db.session.execute(statement)
    db.session.commit()       
    statement = change_price.insert().values(Sid=1, Pid=12)
    db.session.execute(statement)
    db.session.commit()  
    statement = change_price.insert().values(Sid=1, Pid=4)
    db.session.execute(statement)
    db.session.commit()      
    statement = change_price.insert().values(Sid=1, Pid=1)
    db.session.execute(statement)
    db.session.commit()  
    statement = change_price.insert().values(Sid=1, Pid=5)
    db.session.execute(statement)
    db.session.commit()      
    statement = change_price.insert().values(Sid=1, Pid=6)
    db.session.execute(statement)
    db.session.commit()  
    statement = change_price.insert().values(Sid=1, Pid=7)
    db.session.execute(statement)
    db.session.commit() 
    statement = change_price.insert().values(Sid=1, Pid=14)
    db.session.execute(statement)
    db.session.commit()          
    statement = change_price.insert().values(Sid=1, Pid=15)
    db.session.execute(statement)
    db.session.commit()    
    statement = change_price.insert().values(Sid=1, Pid=16)
    db.session.execute(statement)
    db.session.commit()            
    statement = change_price.insert().values(Sid=1, Pid=10)
    db.session.execute(statement)
    db.session.commit() 
    statement = change_price.insert().values(Sid=1, Pid=11)
    db.session.execute(statement)
    db.session.commit()     
    statement = change_price.insert().values(Sid=2, Pid=3)
    db.session.execute(statement)
    db.session.commit() 
    statement = change_price.insert().values(Sid=2, Pid=13)
    db.session.execute(statement)
    db.session.commit()  


#comment - comments - approval

    myComment = []
    myComment.append(Comment("Bu urun gercekten cok uygun bir fiyatta ancak icerikleri hayal kirikligina ugratti.",3) )
    myComment.append(Comment("Mukemmel, 10/10",5) )
    myComment.append(Comment("Berbat, 0/10",1) )
    for cm in myComment:
        db.session.add(cm)        
    db.session.commit()

    statement = approval.insert().values(Pmid=1, cid=1, approved = True)
    db.session.execute(statement)
    db.session.commit()  
    statement = approval.insert().values(Pmid=1, cid=2, approved = True)
    db.session.execute(statement)
    db.session.commit()      
    statement = approval.insert().values(Pmid=1, cid=3, approved = False)
    db.session.execute(statement)
    db.session.commit()      

    assoc = Comments(customer_email = "a@a.com", product_pid=1, comment_id=1)
    db.session.add(assoc)
    db.session.commit()
    assoc = Comments(customer_email = "b@b.com", product_pid=1, comment_id=2)
    db.session.add(assoc)
    db.session.commit()    
    assoc = Comments(customer_email = "u@u.com", product_pid=1, comment_id=3)
    db.session.add(assoc)
    db.session.commit()        

################################
    url = 'http://127.0.0.1:5000/to_purchase/submit'
    myobj = {'email': 'a@a.com',
            "quantity":5,
            "price":26,
            "sale":float( 0.5 ),
            "shipment" : "Processing",
            "Pid" : 1,
            "purcid" : 1,
            "did" : 1
            
    }
       
  
    data= req.post(url, data = json.dumps(myobj))

#################################
    url = 'http://127.0.0.1:5000/refunds/submit'
    myobj = {'uid':'a@a.com',
          'purcid':1  
            
    }
       
  
    data= req.post(url, data = json.dumps(myobj))    
