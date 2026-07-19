count=0
with open("demo.txt","r") as f:
    data=f.read()
    num=data.split(",")
    print(num)
    for val in num:
        if(int(val)%2==0):
           count+=1
           print(count) 