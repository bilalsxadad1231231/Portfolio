import { ThemeProvider } from "./context/Themecontext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectsGallery from "./components/ProjectsGallery";
import Contect from "./components/Contect";
 
function App() {
  return (
    <ThemeProvider>
      <div className="w-full relative bg-bg min-h-screen">
        <Navbar />
        <div>
          <Hero/>
          <About/>
          <Skills/>
          <ProjectsGallery/>
          <Contect/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
