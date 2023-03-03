import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectricCarPage from "./pages/ElectricCarPage";
import Header from "./components/Header";
import PersonalGadgetPage from "./pages/PersonalGadgetPage";
import BooksMagPage from "./pages/BooksMagPage";
import ClothingPage from "./pages/ClothingPage";

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/electric-cars" element={<ElectricCarPage />} />
          <Route path="/personal-gadgets" element={<PersonalGadgetPage />} />
          <Route path="/books-magazines" element={<BooksMagPage />} />
          <Route path="/clothing" element={<ClothingPage />} />
        </Routes>
      </Router>
    </>
  );
}
