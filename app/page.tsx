import Starfield from "@/components/Starfield";
import Hero from "@/components/Hero";
import TechProficiency from "@/components/TechProficiency";
import Projects from "@/components/Projects";
import ContactFooter from "@/components/ContactFooter";
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-space-gradient">
      <Starfield />
      <Hero />
      <TechProficiency />
      <Projects />
      <ContactFooter />
    </main>
  );
}