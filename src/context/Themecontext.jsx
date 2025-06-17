import { createContext ,useState,useEffect, useContext } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ( {children} ) =>{

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "blue");


    useEffect(() => {
        // Set the theme on the root HTML element
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }, [theme]);

    return (

        <ThemeContext.Provider value={ {theme , setTheme} }>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = () => useContext(ThemeContext);