class A:
    varA ="welecome to class A"

class B:
    varB ="welecome to class B" 

class C(A,B):
    varC ="welecome to class C" 

cls=C() #multiple inheritence
print(cls.varA)
print(cls.varB)
print(cls.varC)
print("this is the type of multiple inheritance")