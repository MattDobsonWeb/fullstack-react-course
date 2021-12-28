import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthBox from "./AuthBox";
import Header from "./Header";

const Layout = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<AuthBox register={true} />} />
      </Routes>
    </Router>
  );
};

export default Layout;
