
import React, { useState } from 'react';
import { Product } from './../types';

interface CartItemProps {
    product: Product;
    onRemove: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onRemove, onUpdateQuantity }) => {

    const [quantity, setQuantity] = useState(1);

    const handleRemoveClick = () => {
        onRemove(product.id);
    };

    const handleIncrementClick = () => {
        setQuantity((prevQuantity:number) => {
            const newQuantity = prevQuantity + 1;
            onUpdateQuantity(product.id, newQuantity);
            return newQuantity;
        });
    };

    const handleDecrementClick = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity:number) => {
                const newQuantity = prevQuantity - 1;
                onUpdateQuantity(product.id, newQuantity);
                return newQuantity;
            });
        } else {
            onRemove(product.id);
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title">{product.name}</h5>
                        </div>
                        <p className="card-text">Price: ${product.price}</p>
                    </div>
                    <div className="d-flex justify-content-between align-content-center flex-row flex-wrap">
                        <div className="input-group">
                            <button className="btn btn-outline-secondary" type="button" onClick={handleDecrementClick}>-</button>
                            <input type="text" className="form-control" value={quantity} readOnly />
                            <button className="btn btn-outline-secondary" type="button" onClick={handleIncrementClick}>+</button>
                        </div>
                        <button className="btn btn-danger mt-2" onClick={handleRemoveClick}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;