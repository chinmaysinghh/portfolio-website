import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Research />
      <Skills />
      <Achievements />
      <Contact />
      <CustomCursor />
    </main>
  );
}
