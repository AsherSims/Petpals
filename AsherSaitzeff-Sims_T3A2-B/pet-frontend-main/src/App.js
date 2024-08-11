import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
