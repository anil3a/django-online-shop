import React, { useState } from 'react';
import {
    statesOfAustralia,
    IsEmpty,
    limitInputLength
} from 'components/helpers'

const CheckoutPage: React.FC = () => {
    // State for form fields
    const [personalDetails, setPersonalDetails] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

    const [deliveryAddress, setDeliveryAddress] = useState({
        unitSuite: '',
        streetName: '',
        suburb: '',
        postCode: '',
        state: '',
        country: 'Australia',
    });
    const [billingAddress, setBillingAddress] = useState({
        unitSuite: '',
        streetName: '',
        suburb: '',
        postCode: '',
        state: '',
        country: 'Australia',
    });

    const [creditCard, setCreditCard] = useState({
        cardNumber: '',
        cvv: '',
        expireDate: '',
        cardName: '',
    });
    const [billingAddressSameAsDelivery, setBillingAddressSameAsDelivery] = useState(false);

    const handleBillingSameAsDelivery = (e: React.FormEvent) => {
        setBillingAddressSameAsDelivery(!billingAddressSameAsDelivery)
        if (!billingAddressSameAsDelivery) {
          setBillingAddress({ ...billingAddress, ...deliveryAddress });
          // TODO remove red border
        }
    }

    // Function to handle form submission for credit card
    const handleCreditCardSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission for credit card
        console.log('Personal: ', personalDetails);
        console.log('Delivery: ', deliveryAddress);
        console.log('Billing: ', billingAddress);
        console.log('Credit Card:', creditCard);
    };

    const handleInputChange = (
        objType: string,
        event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        fieldName: string,
        limitNumber: number,
        required: boolean = true
    ) => {
        if (limitNumber > 0){
            limitInputLength(event.target, limitNumber);
        }
        if (objType === "personal"){
            setPersonalDetails({ ...personalDetails, [fieldName]: event.target.value });
        }
        if (objType === "delivery"){
            setDeliveryAddress({ ...deliveryAddress, [fieldName]: event.target.value });
        }
        if (objType === "billing"){
            setBillingAddress({ ...billingAddress, [fieldName]: event.target.value });
        }
        if (objType === "card"){
            setCreditCard({ ...creditCard, [fieldName]: event.target.value });
        }
        if ( required ){
            IsEmpty(event.target);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Checkout</h1>
            <div className="my-4">
                <section>
                    <div className="card my-4">
                        <div className="card-header">
                            <h2>Personal Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 col-sm-12 col-md-6 col-lg-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={personalDetails.firstName}
                                        onChange={(e) => handleInputChange("personal", e, "firstName", 16)}
                                        onBlur={(e) => handleInputChange("personal", e, "firstName", 16)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-12 col-md-6 col-lg-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={personalDetails.lastName}
                                        onChange={(e) => handleInputChange("personal", e, "lastName", 16)}
                                        onBlur={(e) => handleInputChange("personal", e, "lastName", 16)}
                                        required
                                        />
                                    </div>
                                <div className="mb-3 col-sm-12 col-md-6 col-lg-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        value={personalDetails.phone}
                                        onChange={(e) => handleInputChange("personal", e, "phone", 12)}
                                        onBlur={(e) => handleInputChange("personal", e, "phone", 12)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-12 col-md-6 col-lg-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={personalDetails.email}
                                        onChange={(e) => handleInputChange("personal", e, "email", 32)}
                                        onBlur={(e) => handleInputChange("personal", e, "email", 32)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </section>

                <section>
                    <div className="card my-4">
                        <div className="card-header">
                            <h2>Delivery Address</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 col-sm-4 col-md-3 col-lg-2">
                                    <label htmlFor="unitSuite" className="form-label">Unit/Suite</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="unitSuite"
                                        value={deliveryAddress.unitSuite}
                                        onChange={(e) => handleInputChange("delivery", e, "unitSuite", 16, false)}
                                        onBlur={(e) => handleInputChange("delivery", e, "unitSuite", 16, false)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-8 col-md-9 col-lg-4">
                                    <label htmlFor="streetName" className="form-label">Street Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="streetName"
                                        value={deliveryAddress.streetName}
                                        onChange={(e) => handleInputChange("delivery", e, "streetName", 32)}
                                        onBlur={(e) => handleInputChange("delivery", e, "streetName", 32)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="suburb" className="form-label">Suburb</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="suburb"
                                        value={deliveryAddress.suburb}
                                        onChange={(e) => handleInputChange("delivery", e, "suburb", 16)}
                                        onBlur={(e) => handleInputChange("delivery", e, "suburb", 16)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="postCode" className="form-label">Post Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="postCode"
                                        value={deliveryAddress.postCode}
                                        onChange={(e) => handleInputChange("delivery", e, "postCode", 4)}
                                        onBlur={(e) => handleInputChange("delivery", e, "postCode", 4)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select
                                        className="form-select"
                                        id="state"
                                        value={deliveryAddress.state}
                                        onChange={(e) => handleInputChange("delivery", e, "state", 4)}
                                        onBlur={(e) => handleInputChange("delivery", e, "state`", 4)}
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {statesOfAustralia.map((state) => (
                                            <option key={state.code} value={state.code}>
                                                {state.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="country"
                                        value={deliveryAddress.country}
                                        readOnly
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </section>

                <section>
                    <div className="card my-4">
                        <div className="card-header">
                            <h2>Billing Address</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 col-sm-4 col-md-3 col-lg-2">
                                    <label htmlFor="unitSuite" className="form-label">Unit/Suite</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="billingUnitSuite"
                                        value={billingAddress.unitSuite}
                                        readOnly={billingAddressSameAsDelivery}
                                        onChange={(e) => handleInputChange("billing", e, "unitSuite", 16, false)}
                                        onBlur={(e) => handleInputChange("billing", e, "unitSuite`", 16, false)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-8 col-md-9 col-lg-4">
                                    <label htmlFor="streetName" className="form-label">Street Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="billingStreetName"
                                        value={billingAddress.streetName}
                                        readOnly={billingAddressSameAsDelivery}
                                        onChange={(e) => handleInputChange("billing", e, "streetName", 32)}
                                        onBlur={(e) => handleInputChange("billing", e, "streetName`", 32)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="suburb" className="form-label">Suburb</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="billingSuburb"
                                        value={billingAddress.suburb}
                                        readOnly={billingAddressSameAsDelivery}
                                        onChange={(e) => handleInputChange("billing", e, "suburb", 16)}
                                        onBlur={(e) => handleInputChange("billing", e, "suburb`", 16)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="postCode" className="form-label">Post Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="billingPostCode"
                                        value={billingAddress.postCode}
                                        readOnly={billingAddressSameAsDelivery}
                                        onChange={(e) => handleInputChange("billing", e, "postCode", 4)}
                                        onBlur={(e) => handleInputChange("billing", e, "postCode`", 4)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select
                                        className="form-select"
                                        id="billingState"
                                        value={billingAddress.state}
                                        disabled={billingAddressSameAsDelivery}
                                        onChange={(e) => handleInputChange("billing", e, "state", 4)}
                                        onBlur={(e) => handleInputChange("billing", e, "state`", 4)}
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {statesOfAustralia.map((state) => (
                                            <option key={state.code} value={state.code}>
                                                {state.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col-sm-6 col-md-4 col-lg-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="billingCountry"
                                        value={billingAddress.country}
                                        readOnly
                                        required
                                    />
                                </div>

                                <div className="form-check mb-3 col-sm-12">
                                    <div className="ms-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="billingSameAsDelivery"
                                            checked={billingAddressSameAsDelivery}
                                            onChange={handleBillingSameAsDelivery}
                                        />
                                        <label className="form-check-label" htmlFor="billingSameAsDelivery">
                                            Same as Delivery Address
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </section>

                <section>
                    <div className="card my-4">
                        <div className="card-header">
                            <h2>Payment</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 col-sm-12 col-md-8 col-lg-8">
                                    <label htmlFor="cardName" className="form-label">Card Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardName"
                                        value={creditCard.cardName}
                                        onChange={(e) => handleInputChange("card", e, "cardName", 32)}
                                        onBlur={(e) => handleInputChange("card", e, "cardName`", 32)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-12 col-md-4 col-lg-4">
                                    <label htmlFor="expireDate" className="form-label">Expire Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expireDate"
                                        value={creditCard.expireDate}
                                        onChange={(e) => handleInputChange("card", e, "expireDate", 32)}
                                        onBlur={(e) => handleInputChange("card", e, "expireDate`", 32)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-12 col-md-8 col-lg-8">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardNumber"
                                        value={creditCard.cardNumber}
                                        onChange={(e) => handleInputChange("card", e, "cardNumber", 32)}
                                        onBlur={(e) => handleInputChange("card", e, "cardNumber`", 32)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-sm-12 col-md-4 col-lg-4">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        value={creditCard.cvv}
                                        onChange={(e) => handleInputChange("card", e, "cvv", 32)}
                                        onBlur={(e) => handleInputChange("card", e, "cvv`", 32)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-primary float-end" onClick={handleCreditCardSubmit}>
                                Pay Now
                            </button>
                        </div>
                    </div>
                </section>
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};

export default CheckoutPage;