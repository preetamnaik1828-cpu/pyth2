class student:
    def __init__(self,phy,chem,math):
        self.phy=phy
        self.chem=chem
        self.math=math

    @property
    def percentage(self):
        return str((self.phy+self.chem+self.math)/3)+"%"


s1= student(34,78,45)
print(s1.percentage)

s1.phy=98
print(s1.percentage)