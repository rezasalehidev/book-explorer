import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchScreen from "./pages/SearchScreen";
import DetailScreen from "./pages/DetailScreen";
import "@testing-library/jest-dom";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchScreen />} />
      <Route path="/book/:id" element={<DetailScreen />} />
    </Routes>
  </Router>
);

export default App;
