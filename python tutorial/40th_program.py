class student():
    collage_name="abc collage"

    def __init__(self,name,marks):
        self.name=name
        self.marks=marks
        print("adding new name in database.....")
    def hello(self):
        print("hello ",self.name)

    def get(self):
        print("very good marks",self.marks)    



s1=student("preetam",95)
print(s1.name,s1.marks)
s1.hello()
s1.get()

s2=student("sarita",34)
print(s2.name,s2.marks)
print(s2.collage_name)
s2.hello()
s2.get()