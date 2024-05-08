import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    return (
        <div className="container">
            <h1 className="my-4">Checkout</h1>
            <p>Form coming soon</p>
            <div className="my-4">
                <Link to="/checkout" className="btn btn-lg btn-success float-end">
                    Pay
                </Link>
            </div>
        </div>
    );
};

export default CheckoutPage;