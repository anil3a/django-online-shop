
import React from 'react';
import CartItem from './CartItem';
import { Product } from './../types';

interface CartProps {
    cartItems: Product[];
    onRemove: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove, onUpdateQuantity }) => {

    return (
        <div className="container">
            {cartItems.map(item => (
                <CartItem key={item.id} product={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity} />
            ))}
        </div>
    );
}

export default Cart;