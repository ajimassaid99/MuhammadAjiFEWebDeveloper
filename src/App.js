import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./component/navbar";
import Transaction from "./pages/transaction";
import Food from "./pages/food";
import AddFood from "./pages/TambahMakanan";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Router>
        <Routes>
          <Route path="/" element={<Transaction />} />
          <Route path="/Food" element={<Food/>} />
          <Route path="/addfood" element={<AddFood/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
