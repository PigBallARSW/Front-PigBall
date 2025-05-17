import { createContext, useContext, useState } from "react";

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [selectedStyle, setSelectedStyle] = useState("classic");
  return (
    <StyleContext.Provider value={{ selectedStyle, setSelectedStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => useContext(StyleContext);
