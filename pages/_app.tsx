import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/pages/Layout";
import { GlobalProvider } from "../contexts/globalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}
