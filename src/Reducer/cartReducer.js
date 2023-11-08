const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, color, amount, product } = action.payload;
        let cartProduct;
        cartProduct = {
            id: id + color,
            name: product.name,
            color,
            amount,
            image: product.image[0].url,
            price: product.price,
            max: product.stock
        }
        return {
            ...state,
            cart: [...state.cart, cartProduct]
        }
    }
    if (action.type === "REMOVE_ITEM") {
        let updateCart = state.cart.filter((curElem) => curElem.id !== action.payload)
        return {
            ...state,
            cart: updateCart,
        }
    }
    return state;
}

export default cartReducer
