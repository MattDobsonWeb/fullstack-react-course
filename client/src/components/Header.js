import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-header__inner">
        <div className="main-header__left">
          <Link to="/">ToDo List</Link>
        </div>

        <div className="main-header__right">
          <button className="btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
