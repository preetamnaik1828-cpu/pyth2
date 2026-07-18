f=open("practice.txt","r")
data= f.read()
new_data=data.replace("java","python")
print(new_data)

f=open("practice.txt","w")
f.write(new_data)