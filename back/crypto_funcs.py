from Crypto.Hash import SHA256

def hast_ist(input_string):   
    #conver input string to byte object 
    input_bytes = input_string.encode()

    hash = SHA256.new(input_bytes) # hash it
    #conver byte object to string
    output_string = hash.hexdigest()
    return(output_string)