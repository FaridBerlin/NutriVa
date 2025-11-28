// import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage"; // main landing page

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
        {/* <Routes> */}
          {/*  <Route path="/" element={<Home />} />
          <Route path="/UserProfile" element={<UserProfile />} /> */}

          <LandingPage />
        {/* </Routes> */}
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
