class account:

    def __init__(self,account_no,balance):
        self.account_no=account_no
        self.balance=balance

# debit method
    def debit(self,amount):
        self.balance-=amount
        print("Rs",amount,"debited form account")
        print("total balence",self.get_balence())
    #credit method
    def credit(self,amount):
        self.balance+=amount
        print("Rs",amount,"credited from account ")
        print("total balence",self.get_balence())
    def get_balence(self):
        return self.balance


a1=account(3456,80000)
print(a1.account_no)
print(a1.balance)
a1.debit(3000)
a1.credit(500)
a1.debit(60000)