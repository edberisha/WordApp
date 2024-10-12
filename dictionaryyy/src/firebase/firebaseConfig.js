import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";




// Check if an app is already initialized
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  
};

console.log("Firebase API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Defined" : "Not defined");
console.log("Auth Domain:", process.env.NEXT_PUBLIC_AUTH_DOMAIN ? "Defined" : "Not defined");

// Initialize Firebase app only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app); // Initialize Firebase Authentication
const provider = new GoogleAuthProvider(); // Create Google Auth Provider

export { app, auth, provider }; // Don't export analytics
