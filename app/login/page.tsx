"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    try {
      const respuesta = await fetch("/api/usuarios");
      const usuarios = await respuesta.json();

      const usuario = usuarios.find(
        (u: any) =>
          u.email === email &&
          u.password === password
      );

      if (!usuario) {
        alert("Correo o contraseña incorrectos");
        return;
      }

      alert("Bienvenido " + usuario.nombre);

      localStorage.setItem(
      "usuarioLogueado",
       JSON.stringify(usuario)
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-8">
          Iniciar Sesión
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Correo electrónico"
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

          <button
            onClick={iniciarSesion}
            className="bg-blue-600 text-white p-3 rounded-lg font-bold"
          >
            Ingresar
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