import { ThemeProvider } from "./context/Themecontext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Startup from "./components/Startup";
import Skills from "./components/Skills";
import ProjectsGallery from "./components/ProjectsGallery";
import Education from "./components/Education";
import Contect from "./components/Contect";

function App() {
  return (
    <ThemeProvider>
      <div className="w-full relative bg-bg min-h-screen">
        <Navbar />
        <div>
          <Hero/>
          <About/>
          <Experience/>
          <Startup/>
          <Skills/>
          <ProjectsGallery/>
          <Education/>
          <Contect/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
