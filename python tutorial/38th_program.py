def check_for_word():
    word="python"
    with open("practice.txt","r")as f:
        data=f.read()
        if(data.find(word)):
            print("found")
        else:
            print("not found")    
check_for_word()            
