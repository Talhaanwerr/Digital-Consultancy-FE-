import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
// import "./index.css";

// Create a custom theme (optional but recommended)
const theme = extendTheme({
  // You can customize your theme here
  colors: {
    brand: {
      50: "#e6f2ff",
      100: "#b3d9ff",
      500: "#3399ff",
      600: "#0080ff",
      700: "#0066cc",
      800: "#004d99",
      900: "#003366",
    },
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
