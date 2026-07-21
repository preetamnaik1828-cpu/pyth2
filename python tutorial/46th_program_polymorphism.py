class complex:
    def __init__(self,real,img):
        self.real=real
        self.img=img

    def shownumber(self):
        print(self.real,"i+", self.img,"j")


    def __add__(self,c1):
        new_real=c1.real+self.real
        new_img=c1.img+self.img
        return complex(new_real,new_img)

            



c1= complex(6,7)
c1.shownumber()  

c2= complex(5,6)
c2.shownumber() 

c3=c1+c2
c3.shownumber()