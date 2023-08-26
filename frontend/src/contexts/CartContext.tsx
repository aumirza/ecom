"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  quantity: number;
  product: IProduct;
  subtotal: number;
}

const CartContext = createContext({
  cart: [] as CartItem[],
  cartCount: 0,
  cartTotal: 0,
  cartOpen: false,
  inCart: (product: IProduct) => ({ quantity: 0 }),
  addToCart: (product: IProduct, quantity?: number) => {},
  removeFromCart: (product: IProduct) => {},
  clearCart: () => {},
  toggleCart: () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }: any) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      setCart(cartObj);
      setCartCount(cartObj.length);
      setCartTotal(
        cartObj.reduce(
          (total: number, CI: CartItem) =>
            total + CI.product.price * CI.quantity,
          0
        )
      );
    }
  }, []);

  useEffect(() => {
    if (!cart.length) return;
    setCartCount(cart.length);
    setCartTotal(
      cart.reduce(
        (total: number, CI: CartItem) => total + CI.product.price * CI.quantity,
        0
      )
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: IProduct , quantity = 1 ) => {
    const newCart = [...cart];
    const CartItemIndex = newCart.findIndex(
      (CartItem: CartItem) => CartItem.product.id === product.id
    );
    if (CartItemIndex !== -1) {
      const CartItem = newCart[CartItemIndex];
      CartItem.quantity++;
      CartItem.subtotal = CartItem.quantity * product.price;
      newCart[CartItemIndex] = CartItem;
    } else {
      newCart.push({ product, quantity, subtotal: product.price });
    }
    setCart(newCart);
  };

  const removeFromCart = (product: IProduct) => {
    const existingProduct = cart.find(
      (CI: CartItem) => CI.product.id === product.id
    );
    if (existingProduct) {
      if (existingProduct.quantity === 1) {
        const newCart = cart.filter(
          (CI: CartItem) => CI.product.id !== product.id
        );
        setCart(newCart);
      } else {
        existingProduct.quantity--;
        setCart([...cart]);
      }
      setCartCount(cartCount - 1);
      setCartTotal(cartTotal - product.price);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  const inCart = (product: IProduct) => {
    const existInCart = cart.find(
      (CI: CartItem) => CI.product.id === product.id
    );

    return existInCart ?? { quantity: 0 };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        cartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        toggleCart,
        inCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
