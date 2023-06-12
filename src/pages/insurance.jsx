import { Header, Footer } from '@components/shared';
import Head from 'next/head';
import InsuranceLandingPage from '../components/insurance';
import '../styles/globals.css';
import '../components/insurance/styles.css';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Lighthouse Insurance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header blackNav />
      <main>
        <InsuranceLandingPage />
      </main>
      <Footer />
    </>
  );
}
