from Crypto.Hash import SHA256

def hash_it(input_string , bitvector = 0 ):   
    #conver input string to byte object 
    input_bytes = input_string.encode()
    #add bit vector if needed for salt and paper 
    hash = SHA256.new(input_bytes) # hash it
    #conver byte object to string
    output_string = hash.hexdigest()
    return(output_string)