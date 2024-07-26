import React from 'react';

const CouponPopup = ({ couponCode, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Your Coupon Code</h2>
                <p className="text-xl font-mono mb-4">{couponCode}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CouponPopup;
