class student:
    collage_name="UVCE"
    def __init__(self,name,marks):
        self.name=name
        self.marks=marks
        

    def get_avg(self):
        #sum=0
        #for val in self.marks:
           #  sum+=val
        #print("avg sum",sum/3)
           

s1=student("preetam",[34,56,78])
s1.get_avg()