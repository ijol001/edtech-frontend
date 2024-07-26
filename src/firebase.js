import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent as firebaseLogEvent} from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR-MEASUREMENT-ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logEvent = (eventName, eventParams) => {
  firebaseLogEvent (analytics, eventName, eventParams);
};


const addCoupon = async (code, discount) => {
  try {
    await setDoc(doc(db, 'coupons', code), {
      code: code,
      discount: discount,
      valid: true,
    });
    console.log("Coupon added successfully");
  } catch (error) {
    console.error("Error adding coupon: ", error);
  }
};

const validateCoupon = async (code) => {
  try {
    const q = query(collection(db, "coupons"), where("code", "==", code), where("valid", "==", true));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const coupon = querySnapshot.docs[0].data();
      return coupon.discount;
    } else {
      throw new Error('Invalid or expired coupon code');
    }
  } catch (error) {
    console.error("Error validating coupon: ", error);
    throw error;
  }
};

export { addCoupon, validateCoupon };
