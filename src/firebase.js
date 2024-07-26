import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent as firebaseLogEvent} from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID",
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
