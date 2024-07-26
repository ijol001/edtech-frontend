const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

function generateCouponCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

exports.generateCouponCode = functions.https.onCall(async (data, context) => {
  const couponCode = generateCouponCode(8); // Generate an 8-character code
  const discount = data.discount || 10; // Default to 10% discount

  // Save to Firestore
  await db.collection("coupons").doc(couponCode).set({
    code: couponCode,
    discount: discount,
    used: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {couponCode: couponCode, discount: discount};
});

exports.validateCoupon = functions.https.onCall(async (data, context) => {
  const couponCode = data.couponCode;

  const couponDoc = await db.collection("coupons").doc(couponCode).get();

  if (!couponDoc.exists || couponDoc.data().used) {
    throw new functions.https.HttpsError("invalid","Invalid");
  }

  const discount = couponDoc.data().discount;
  return {discount: discount};
});
