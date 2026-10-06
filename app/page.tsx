import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MetroMap } from "@/components/MetroMap";
import { Routes } from "@/components/Routes";
import { Technologies } from "@/components/Technologies";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrap">
        <Hero />
        <MetroMap />
        <Routes />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
