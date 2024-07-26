import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalComponent = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "ENTER-PAYPAL-CLIENT-ID" }}>
      <PayPalButtons
        createOrder={async (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount
                },
              },
            ],
          }).catch((err) => {
            if (onError) onError(err);
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then((details) => {
            if (onSuccess) onSuccess(details);
          }).catch((err) => {
            if (onError) onError(err);
          });
        }}
        onError={(err) => {
          if (onError) onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;
