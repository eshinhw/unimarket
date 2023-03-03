import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectricCarPage from "./pages/CategoryPage";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/electric-cars" element={<ElectricCarPage />} />
        </Routes>
      </Router>
    </>
    // <div>
    // <Navigation
    //   props={[
    //     setToggleCar,
    //     setToggleGadget,
    //     setToggleBook,
    //     setToggleClothing,
    //     setToggleCarousel,
    //     account,
    //   ]}
    // />
    //   <HomePage />
    //   {toggleCar && (
    //     <Section
    //       title={"Electric Cars"}
    //       cars={cars}
    //       setToggle={setToggleCar}
    //       unimarket={unimarket}
    //       provider={provider}
    //       account={account}
    //     />
    //   )}
    //   {toggleGadget && (
    //     <Section
    //       title={"Personal Gadgets"}
    //       cars={gadgets}
    //       setToggle={setToggleGadget}
    //       unimarket={unimarket}
    //       provider={provider}
    //       account={account}
    //     />
    //   )}
    //   {toggleBook && (
    //     <Section
    //       title={"Books & Magazines"}
    //       cars={books}
    //       setToggle={setToggleBook}
    //       unimarket={unimarket}
    //       provider={provider}
    //       account={account}
    //     />
    //   )}
    //   {toggleClothing && (
    //     <Section
    //       title={"Clothing"}
    //       cars={clothing}
    //       setToggle={setToggleClothing}
    //       unimarket={unimarket}
    //       provider={provider}
    //       account={account}
    //     />
    //   )}
    // </div>
  );
}
