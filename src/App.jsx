import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Create from "./pages/Create";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;
