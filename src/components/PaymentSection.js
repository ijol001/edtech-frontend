import React, { useState, useEffect } from 'react';
import PayPalComponent from './PayPalComponent'; // Ensure this component receives the amount prop
import CouponPopup from './CouponCodePop';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { logEvent } from '../firebase';

const PaymentSection = () => {
  const db = getFirestore();
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showCouponModel, setShowCouponModel] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState('');
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const featurePrices = {
    'Data Structure': 1000,
    'Web Development': 1000,
    'Machine Learning': 1000,
  };

  useEffect(() => {
    if (selectedFeature) {
      const calculatedAmount = (featurePrices[selectedFeature] * (1 - discount / 100)).toFixed(2);
      setAmount(calculatedAmount);
    }
  }, [selectedFeature, discount]);


  const generateCouponCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleGenerateCoupon = async () => {
    setLoading(true);
    try {
      const couponCode = generateCouponCode(8);
      const discount = 10;
      await setDoc(doc(collection(db, 'coupons'), couponCode), {
        email,
        selectedFeature,
        discount,
        amount: featurePrices[selectedFeature],
        createdAt: new Date(),
        used: false,
      });
      setGeneratedCoupon(couponCode);
      setShowCouponModel(true);

      logEvent('coupon_generated', {
        coupon_code: couponCode,
        email,
        feature: selectedFeature,
        discount,
      });
    } catch (err) {
      setError('Failed to generate coupon code');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    setError('');
    setLoading(true);

    try {
      const couponRef = doc(db, 'coupons', coupon);
      const couponDoc = await getDoc(couponRef);

      if (!couponDoc.exists() || couponDoc.data().used) {
        throw new Error('Invalid or used coupon code');
      }

      const couponData = couponDoc.data();
      if (couponData.valid === false) {
        throw new Error('Coupon code has expired');
      }

      setDiscount(couponData.discount);

      logEvent('coupon_applied', {
        coupon_code: coupon,
        email,
        discount: couponData.discount,
      });
    } catch (err) {
      setError('Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  const handlePaypalSuccess = (details) => {
    setSuccess(true);
    console.log('Transaction completed by ' + details.payer.name.given_name);
    alert('Course successfully bought!');

    logEvent('payment_success', {
      amount,
      payer_name: details.payer.name.given_name,
      transaction_id: details.id,
    });

    navigate('/');
  };

  const handlePaypalError = (err) => {
    setError(err.message);
    setLoading(false);

    logEvent('payment_error', {
      error_message: err.message,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Payment Section</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Feature</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedFeature}
            onChange={(e) => setSelectedFeature(e.target.value)}
          >
            <option value="" disabled>Select a feature</option>
            {Object.keys(featurePrices).map((feature) => (
              <option key={feature} value={feature}>
                {feature}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <button
            onClick={handleGenerateCoupon}
            className="bg-blue-600 text-white px-3 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Get Coupon Code'}
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            onClick={handleApplyCoupon}
            className="w-full bg-blue-600 text-white px-3 py-2 mt-2 rounded"
            disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply Coupon'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <p className="text-xl font-bold mb-4">
          Total Amount: ${amount}
        </p>
        
        <PayPalComponent
          amount={amount}
          onSuccess={handlePaypalSuccess}
          onError={handlePaypalError}
          

        />
        {success && <p className="text-green-500 text-sm mt-4">Payment successful!</p>}
      </div>
      {showCouponModel && (
        <CouponPopup
          couponCode={generatedCoupon}
          onClose={() => setShowCouponModel(false)}
        />
      )}
    </div>
  );
};

export default PaymentSection;
