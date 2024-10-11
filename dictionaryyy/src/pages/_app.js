import "@/styles/globals.css";
import { AuthProvider } from '../hooks/AuthContext'
import ActiveUserDisplay from "../components/activeuserDisplay";
import UserProfile from '../components/UserProfile'

// import type { AppProps } from "next/app";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="app">
      </div>
      <ActiveUserDisplay />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
