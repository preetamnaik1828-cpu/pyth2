class empolye:
    def __init__(self,role,department,salary):
        self.role=role
        self.department=department
        self.salary=salary

    def showdetail(self):
        print("role of the empolye",self.role)
        print("department of the empolye",self.department)
        print("salary of the empolye",self.salary)

class engineer(empolye):
    def __init__(self,name, age):
        self.name=name
        self.age=age
        super().__init__("enginner","it","300000")

eg1=engineer("preetam","18")
print(eg1.name)
print(eg1.age)
print(eg1.showdetail())        