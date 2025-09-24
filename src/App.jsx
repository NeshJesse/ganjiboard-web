import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/landing";
import Demo from "./pages/Demo";
export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}