import React from 'react'
import FormatPrice from './FormatPrice'
import CartAmountToggle from './CartAmountToggle'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../Context/cart_context'

const CartItem = ({ id, name, image, color, price, amount }) => {
    console.log(image)
    const firstImage = image && image.length > 0 ? image[0].url : null;
    // const [amount, setAmount] = useState(1); //amount is quantity
    const { removeItem, setDecrease, setIncrease } = useCartContext();
    return (
        <>
            <div className='cart_heading grid grid-five-column'>
                <div className="cart-image--name">
                    <div>
                        <figure>
                            {firstImage && (
                                <img
                                    src={firstImage}
                                    // className='box-image--style'
                                    alt={name}
                                />
                            )}
                        </figure>
                    </div>
                    <div>
                        <p>{name}</p>
                        <div className="color-div">
                            <p>color:</p>
                            <div className="color-style" style={{ backgroundColor: color, color: color }}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-hide">
                    <p>
                        <FormatPrice price={price} />
                    </p>
                </div>
                <CartAmountToggle amount={amount} setIncrease={() => setIncrease(id)} setDecrease={() => setDecrease(id)} />
                <div className="cart-hide">
                    <p>
                        <FormatPrice price={price * amount} />
                    </p>
                </div>
                <div>
                    <FaTrash className="remove_icon" onClick={() => {
                        removeItem(id)
                    }} />
                </div>
            </div>
        </>
    )
}

export default CartItem
