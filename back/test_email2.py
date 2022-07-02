## Authored by Cem Kaya & Baha Mert Ersoy

import smtplib
import time
import imaplib  
import email
import traceback 
# -------------------------------------------------
#
# Utility to read email from Gmail Using Python
#
# ------------------------------------------------
ORG_EMAIL = "@gmail.com" #CS.308.Group4@gmail.com
FROM_EMAIL = "miyavcs308group4"#miyavcs308group4"# "CS.308.Group4.mail3" + ORG_EMAIL 
FROM_PWD = "rntqcipklvirskgo"  #rntqcipklvirskgo
SMTP_SERVER = "imap.gmail.com" 
SMTP_PORT = 993

def read_email_from_gmail():
    try:
        mail = imaplib.IMAP4_SSL(SMTP_SERVER)
        mail.login(FROM_EMAIL,FROM_PWD)
        mail.select('inbox')

        data = mail.search(None, 'ALL')
        mail_ids = data[1]
        id_list = mail_ids[0].split()   
        first_email_id = int(id_list[0])
        latest_email_id = int(id_list[-1])
        return len(id_list)
        #for i in range(latest_email_id,first_email_id, -1):
        #    data = mail.fetch(str(i), '(RFC822)' )
        #    for response_part in data:
        #        arr = response_part[0]
        #        if isinstance(arr, tuple):
        #            msg = email.message_from_string(str(arr[1],'utf-8'))
        #            email_subject = msg['subject']
        #            email_from = msg['from']
        #            print('From : ' + email_from + '\n')
        #            print('Subject : ' + email_subject + '\n')

    except Exception as e:
        traceback.print_exc() 
        print(str(e))
if __name__=="__main__":
    read_email_from_gmail()