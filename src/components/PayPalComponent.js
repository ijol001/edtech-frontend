import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalComponent = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AX6k4ZFD6wGPN-UnK2P3BWB4y2a2LibdJG4Mpn-JTCUd0Gk2995mek-2XJagPZz-br59reH6xaSACU6g"}}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          }).then(orderID => {
            return orderID;
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;
