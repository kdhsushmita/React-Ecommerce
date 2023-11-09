import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../Reducer/cartReducer'

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("sushmitaCart");
    if (!localCartData || localCartData === "[]") {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
}

const initialState = {
    cart: getLocalCartData(), //empty cart
    total_item: "",
    total_price: "",
    shipping_fee: 50000
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } })
    }
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id })
    }
    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id })
    }
    useEffect(() => {
        dispatch({ type: "CART_TOTAL_ITEM" })
        dispatch({ type: "CART_TOTAL_PRICE" })
        localStorage.setItem("sushmitaCart", JSON.stringify(state.cart))
    }, [state.cart])
    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setIncrease, setDecrease }}>
            {children}
        </CartContext.Provider>
    )
}

const useCartContext = () => {
    return useContext(CartContext);
}

export { CartProvider, useCartContext }