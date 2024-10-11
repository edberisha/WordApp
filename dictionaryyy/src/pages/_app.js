import "@/styles/globals.css";
import { AuthProvider } from '../hooks/AuthContext'
import ActiveUserDisplay from "../components/activeuserDisplay";

// import type { AppProps } from "next/app";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ActiveUserDisplay />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
