import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Arrival from "@/components/Arrival";
import Ledger from "@/components/Ledger";
import Rooms from "@/components/Rooms";
import Voices from "@/components/Voices";
import Place from "@/components/Place";
import Rates from "@/components/Rates";
import Footer from "@/components/Footer";
import RevealRoot from "@/components/RevealRoot";
import StayRail from "@/components/StayRail";

export default function Home() {
  return (
    <>
      <noscript>
        {/* Reveals are progressive enhancement: without JS everything is shown. */}
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <Nav />
      <main id="main">
        <Hero />
        <Arrival />
        <Ledger />
        <Rooms />
        <Voices />
        <Place />
        <Rates />
      </main>
      <Footer />

      <RevealRoot />
      <StayRail />
    </>
  );
}
