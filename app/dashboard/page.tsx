"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [nombreUsuario, setNombreUsuario] = useState("");

  const router = useRouter();

  useEffect(() => {
    const usuarioGuardado =
      localStorage.getItem("usuarioLogueado");

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      setNombreUsuario(usuario.nombre);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");

    router.push("/login");
  };

  return (
  <ProtectedRoute>

    <main className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Panel de Usuario
          </h1>

          <p className="text-xl text-gray-600">
            Bienvenido {nombreUsuario}
            <div className="grid grid-cols-4 gap-4 mt-8 mb-10">

           <div className="bg-white rounded-xl shadow-lg p-4 text-center">
           <div className="text-3xl">🐕</div>
           <p className="font-bold">Mascotas</p>
           </div>

           <div className="bg-white rounded-xl shadow-lg p-4 text-center">
           <div className="text-3xl">📅</div>
           <p className="font-bold">Paseos</p>
          </div>

           <div className="bg-white rounded-xl shadow-lg p-4 text-center">
           <div className="text-3xl">👨‍🦱</div>
           <p className="font-bold">Paseadores</p>
           </div>

           <div className="bg-white rounded-xl shadow-lg p-4 text-center">
           <div className="text-3xl">📍</div>
           <p className="font-bold">GPS</p>
           </div>

          </div>
          </p>
        </div>

        <button
          onClick={cerrarSesion}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold"
        >
          Cerrar Sesión
        </button>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <a
          href="/paseadores"
          className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-8 rounded-2xl shadow-xl block hover:scale-105 transition" 
         >
        <h2 className="text-2xl font-bold mb-3">
          👨‍🦱 Paseadores
        </h2>

        <p>
    Conocé nuestros paseadores verificados.
       </p>
       </a>

        <a
          href="/mascotas"
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 rounded-2xl shadow-xl block hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            🐕 Mis Mascotas
          </h2>

          <p>
            Administrá la información de tus mascotas.
          </p>
        </a>

        <a
          href="/paseos"
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-2xl shadow-xl block hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            📅 Mis Paseos
          </h2>

          <p>
            Consultá todos los paseos programados.
          </p>
        </a>

        <a
          href="/gps"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-2xl shadow-xl block hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            📍 Seguimiento GPS
          </h2>

          <p>
            Seguí la ubicación de tu mascota en tiempo real.
          </p>
        </a>

        <a
          href="/perfil"
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-8 rounded-2xl shadow-xl block hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-3">
            👤 Mi Perfil
          </h2>

          <p>
            Gestioná tus datos personales.
          </p>
        </a>

      </div>

    </main>
</ProtectedRoute>
);
}