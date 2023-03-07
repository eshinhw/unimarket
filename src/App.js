import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LaptopPage from "./pages/LaptopPage";
import Header from "./components/Header";
import PersonalGadgetPage from "./pages/PersonalGadgetPage";
import BooksMagPage from "./pages/BooksMagPage";
import ClothingPage from "./pages/ClothingPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import { StateContext, StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";

export default function App() {
  return (
    <>
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/laptops" element={<CategoryPage category="Laptop" />} />
          <Route path="/personal-gadgets" element={<CategoryPage category="Personal Gadget" />} />
          <Route path="/books-magazines" element={<CategoryPage category="Books & Magazines" />} />
          <Route path="/clothing" element={<CategoryPage category="Clothing" />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </>
  );
}
