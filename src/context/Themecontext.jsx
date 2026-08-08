import { createContext ,useState,useEffect, useContext } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ( {children} ) =>{

    // Every load starts on blue. A previously chosen theme is deliberately not
    // restored — switching applies for the session only.
    const [theme, setTheme] = useState("blue");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);

    return (

        <ThemeContext.Provider value={ {theme , setTheme} }>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = () => useContext(ThemeContext);