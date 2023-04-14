import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import LoginModal from "@/modals/LoginModal";
import "@/styles/globals.css";
import RegisterModal from "@/modals/RegisterModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
