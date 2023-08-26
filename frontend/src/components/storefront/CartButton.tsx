"use client";
import { useCart } from "@/contexts/CartContext";
import { BsBag, BsXCircle } from "react-icons/bs";

export default function CartButton() {
  const { cartCount, cartOpen, toggleCart, cart, removeFromCart } = useCart();

  return (
    <div className="relative">
      <button
        className="flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner"
        onClick={toggleCart}
      >
        <BsBag />
        
        <span className="pl-1 text-gray-500 text-md">{cartCount}</span>
      </button>
      {cartOpen && (
        <div className="absolute top-full right-0">
          <div className="flex flex-col w-64 shadow-lg rounded-lg overflow-hidden mt-2 bg-white">
            <div className="flex justify-between items-center border p-2 ">
              <p className="font-semibold text-gray-800">Cart</p>
              <button className="text-gray-600 focus:outline-none">
                <BsXCircle onClick={toggleCart} />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="flex flex-col justify-between min-h-full">
                <div>
                  <div className="flex justify-between items-center p-2 bg-gray-200">
                    <p className="font-semibold text-gray-600">Product</p>
                    <p className="font-semibold text-gray-600">quantity</p>
                    <p className="font-semibold text-gray-600">Subtotal</p>
                  </div>

                  {cart.length ? (
                    cart.map((item) => (
                      <div
                        className="flex justify-between items-center p-2 bg-gray-100"
                        key={item.product.id}
                      >
                        <div className="flex items-center">
                          <img
                            src={item.product.image}
                            alt="product"
                            className="w-20 rounded-full"
                          />
                          <div className="flex flex-col ml-2">
                            <span className="text-sm font-bold">
                              {item.product.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {item.product.price}
                            </span>
                            <span className="text-xs text-gray-400">
                              {item.quantity}
                            </span>

                            <button
                              className="text-red-500 text-xs"
                              onClick={() => removeFromCart(item.product)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">
                          {item.product.price}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center p-2 bg-gray-100">
                      <span className="text-sm font-bold">
                        No items in cart
                      </span>
                    </div>
                  )}
                </div>

                {cart.length ? (
                  <div className="flex justify-between items-center p-2 bg-gray-100 border-t">
                    <span className="font-semibold text-sm text-gray-600"></span>
                    <span className="font-semibold text-sm text-gray-600">
                      {cart.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      )}
                    </span>
                  </div>
                ) : null}

                <button
                  className="flex justify-center items-center w-full h-10 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm rounded-b-lg disabled:opacity-50"
                  disabled={!cart.length}
                >
                  <span className="mx-2 font-semibold">Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
