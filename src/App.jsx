import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OxfordTest from "./pages/OxfordTest";
import SwlsTest from "./pages/SwlsTest";
import ShsTest from "./pages/ShsTest";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oxford" element={<OxfordTest />} />
        <Route path="/swls" element={<SwlsTest />} />
        <Route path="/shs" element={<ShsTest />} />
      </Routes>
    </Router>
  );
}
