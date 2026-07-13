#voting 
age= int(input("enter your age:"))
if (age>18):
    print("you are eligible for voting")
if(age==18):
    print("you will apply the voting card")
    docu= input("All Document's Avilable(Y/N)")
    if (docu=="Y"):
        print("requried document are photo, addhar card,etc")
    elif(docu=="N"):
        print("help")
       
else:
    print("you are not eligible for voting")    
   


