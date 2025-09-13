import React from "react";
import { Link } from "react-router-dom";

export default function Auth() {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="px-4 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-500 transition"
      >
        Войти
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 rounded-md border border-blue-500 text-blue-500  hover:text-white hover:bg-blue-500 transition"
      >
        Регистрация
      </Link>
    </div>
  );
}
