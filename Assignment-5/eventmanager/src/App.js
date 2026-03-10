import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClubPage from "./pages/ClubPage";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/club/:name" element={<ClubPage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;