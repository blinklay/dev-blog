import React, { useState } from "react";
import DefaulButton from "../components/DefaulButton";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-[610px] mx-auto">
      <h1>Регистрация</h1>
      <form
        className="flex flex-col gap-4 border border-gray-300 p-4 mt-4 text-sm"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            onChange={onChangeHandler}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            className="border px-4 py-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Почта:</label>
          <input
            onChange={onChangeHandler}
            type="email"
            id="email"
            value={formData.email}
            name="email"
            className="border px-4 py-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Пароль</label>
          <input
            onChange={onChangeHandler}
            type="password"
            id="password"
            value={formData.password}
            name="password"
            className="border px-4 py-2"
            required
          />
        </div>

        <div className="w-auto">
          <DefaulButton>Создать аккаунт</DefaulButton>
        </div>
      </form>
    </div>
  );
}
