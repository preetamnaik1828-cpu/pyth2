name= input("enter the name of the user:")
empty_dict={}
x=int(input("enter your phy marks:"))
empty_dict.update({"phy":x})
x=int(input("enter your cham marks:"))
empty_dict.update({"cham":x})
x=int(input("enter your msths marks"))
empty_dict.update({"maths":x})
print(empty_dict)



#way to store 9&9.0 separte values
values= {
    ("float",9.0),("int",9)
}
print(values)