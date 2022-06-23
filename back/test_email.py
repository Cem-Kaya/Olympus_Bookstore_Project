import yagmail
from fpdf import FPDF
import time
import os.path


#################
import poplib
import string, random
#import StringIO, rfc822
import logging


#############################  pdf shenanigans  #########################
def make_pdf(text ):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Times", size = 14)
    pdf.cell(200, 10, txt = "INVOICE",          ln = 1, align = 'C')
    # add another cell
    pdf.multi_cell(150 , 10, txt = text ,border = 1, align = 'C'  )
    pdf_name ="./pdfs/"+ str(time.time())+ ".pdf" #buraya date ile verecegiz isim
    pdf.output(pdf_name )   
    time.sleep(0.02)
    return pdf_name
  
def send_email(receiver, text):
    yag = yagmail.SMTP( "aa","aaa") # miyavcs308group4@gmail.com" ,  "rntqcipklvirskgo")# )'CS.308.Group4.mail3@gmail.com', 'qwodctqssaobfgmc')
    filename =  make_pdf(text )

    yag.send(
        to=receiver,
        subject="Thank you for your purchase",
        contents="Also the invoince info is in the PDF ! \n"+text, 
        attachments= filename   
    )
    time.sleep(0.2)
    os.remove(filename)
  


#############################  pdf shenanigans  #########################

if __name__ == "__main__":
    receiver = "bersoy@sabanciuniv.edu"
    text = "Hello there from Python"
    send_email(receiver,text)

