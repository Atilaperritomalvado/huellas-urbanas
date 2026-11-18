"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPaseador() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const iniciarSesion = async () => {
    setError("");

    const respuesta = await fetch(
      "/api/login-paseador",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const datos =
      await respuesta.json();

    if (!respuesta.ok) {
      setError(
        datos.error ||
          "Error al iniciar sesión"
      );
      return;
    }

    localStorage.setItem(
      "paseadorLogueado",
      JSON.stringify(datos)
    );

    router.push(
      "/dashboard-paseador"
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          👨‍🦱 Login Paseador
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full mb-4"
        />

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={iniciarSesion}
          className="bg-blue-600 text-white w-full p-3 rounded-lg font-bold"
        >
          Ingresar
        </button>

      </div>

    </main>
  );
}