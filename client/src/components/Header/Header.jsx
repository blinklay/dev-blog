import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "./Auth";

export default function Header() {
  return (
    <header className="bg-white py-2 border border-gray-300">
      <div className="flex items-center justify-between gap-2 max-w-[1220px] mx-auto">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>
        <Auth />
      </div>
    </header>
  );
}
