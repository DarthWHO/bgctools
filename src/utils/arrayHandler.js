const shoppingCart = [
  { id: 1, product: "HDMI cable", price: 4 },
  { id: 2, product: "Easy Bake Oven", price: 28 },
  { id: 3, product: "Peach Pie", price: 6.5 },
];

console.log(shoppingCart);

// Adding to an array
const newShoppingCartAdd = [
  ...shoppingCart,
  { id: 4, product: "Coffee Mug", price: 7.99 },
];
console.log(newShoppingCartAdd);

// Removing an element
const newShoppingCartRemove = shoppingCart.filter((item) => item.id !== 2);
console.log(newShoppingCartRemove);

// Updating all elements
const newShoppingCartUpdateAll = shoppingCart.map((item) => {
  return { ...item, product: item.product.toLowerCase() };
});
console.log(newShoppingCartUpdateAll);

// Updating a single element
const newShoppingCartUpdateSpecific = shoppingCart.map((item) => {
  if (item.id === 3) {
    return { ...item, price: 10.99 };
  } else {
    return item;
  }
});
console.log(newShoppingCartUpdateSpecific);

