import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch(window.checkout_api)
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error fetching cart items:', error));
    }, []);

    const handleRemoveFromCart = (productId: number) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    return (
        <div className="container">
            <h1 className="my-4">Shopping cart</h1>
            <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
            <div className="my-4">
                <Link to="/checkout" className="btn btn-lg btn-success float-end">
                    Checkout
                </Link>
            </div>
        </div>
    );
}

export default CartPage;