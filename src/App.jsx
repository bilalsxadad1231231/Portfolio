import { ThemeProvider } from "./context/Themecontext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contect from "./components/Contect";
 
function App() {
  return (
    <ThemeProvider>
      <div className="w-full relative bg-bg min-h-screen">
        <Navbar />
        <div className="pt-16">
          <Home/>
          <About/>
          <Skills/>
          <Projects/>
          <Contect/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
