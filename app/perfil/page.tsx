"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";

export default function Perfil() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const usuarioGuardado =
      localStorage.getItem("usuarioLogueado");

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, []);

  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Mi Perfil
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">

        <div className="flex flex-col gap-4">

          <input
            type="text"
            value={nombre}
            readOnly
            className="border p-3 rounded-lg bg-gray-100"
          />

          <input
            type="email"
            value={email}
            readOnly
            className="border p-3 rounded-lg bg-gray-100"
          />

        </div>

      </div>

    </main>
    </ProtectedRoute>
  );
}