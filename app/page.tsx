import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import { Skills, Process } from "@/components/SkillsProcess";
import Collaborate from "@/components/Collaborate";
import Footer from "@/components/Footer";
import MineDog from "@/components/MineDog";

export default function Home() {
  return (
    <>
      <Nav />
      <MineDog />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Process />
        <Collaborate />
      </main>
      <Footer />
    </>
  );
}
