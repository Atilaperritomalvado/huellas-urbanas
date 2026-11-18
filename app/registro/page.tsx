"use client";

import { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const registrarUsuario = async () => {
    if (!nombre || !email || !password) {
      alert("Completa todos los campos");
      return;
    }

    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const respuesta = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
        }),
      });

      if (!respuesta.ok) {
        alert("Error al registrar usuario");
        return;
      }

      alert("Usuario registrado correctamente");

      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmarPassword("");

    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Crear Cuenta
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button
            onClick={registrarUsuario}
            className="bg-green-600 text-white p-3 rounded-lg font-bold"
          >
            Registrarse
          </button>

        </div>

        <a
          href="/"
          className="block text-center mt-6 text-blue-600 font-bold"
        >
          Volver al Inicio
        </a>

      </div>

    </main>
  );
}