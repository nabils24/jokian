import Image from "next/image";
import Navbar from "@/components/Navigasi/navbar";
import Hero from "@/components/Hero/hero";
import Liked from "@/components/liked/liked";
import CardGrid from "@/components/Card/cardGrid";
import Footer from "@/components/Footer/footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Liked />
      <CardGrid />
      <Footer />
    </main>
  );
}
