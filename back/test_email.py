import yagmail


receiver = "bersoy@sabanciuniv.edu"
body = "Hello there from Python"
#filename = "document.pdf"

#yag = yagmail.SMTP("my@gmail.com")
yag = yagmail.SMTP('CS.308.Group4@gmail.com', '123123Cs308')

yag.send(
    to=receiver,
    subject="Yagmail test with attachment",
    contents=body,     
)

