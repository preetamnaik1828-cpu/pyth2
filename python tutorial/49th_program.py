class order:
    def __init__(self,item,price):
        self.item=item
        self.price=price

    def __gt__(self,o2):
        return self.price>o2.price
        

o1=order("coffee","50")
print(o1.item)
print(o1.price)

o2=order("tea","80")
print(o2.item)
print(o2.price)

print(o2>o1)