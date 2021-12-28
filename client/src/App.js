import "./main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthBox from "./components/AuthBox";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<AuthBox register={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
