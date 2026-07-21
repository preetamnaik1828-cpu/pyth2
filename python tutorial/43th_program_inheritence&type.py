class car:
    def __init__(self,type):
        self.type= type

    @staticmethod
    def start():
        print("car started")

    @staticmethod
    def stop():
        print("car stoped")

class toyoto_car(car):
    def __init__(self,brand,type):
        self.brand=brand
        super().__init__(type)
        super().start()


#class hilux_car(toyoto_car):
 #   def __init__(self, type):
 #       self.type=type


car1= toyoto_car("hilux","petorl")
print(car1.type)
print(car1.brand)