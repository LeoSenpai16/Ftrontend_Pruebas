# test_example.py

class ShoppingCart:

def __init__(self) -> None: self.items: List [str] = []
def add_item(self, item: str): 
    self.items.append(item)
def size(self) -> int: 
    return len(self.items)
def get_items(self) -> List[str]:
    return self.items

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, item: str):
        self.items.append(item)

    def size(self) -> int:
        return len(self.items)

    def get_items(self) -> List[str]:
        return self.items.copy()
        
    cart = ShoppingCart()
    cart.add_item("Book")
    cart.add_item("Book2")
    cart.add_item("Book") #duple