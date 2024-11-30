import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from './components/Navbar'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MightDeckData from "./components/MightDeckData";


function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <MightDeckData />
    </React.Fragment>
  );
}

export default App;
