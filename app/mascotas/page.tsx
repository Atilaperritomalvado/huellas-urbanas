"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";

type Mascota = {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
};

export default function Mascotas() {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");

  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const cargarMascotas = async () => {
    const usuario = JSON.parse(
      localStorage.getItem("usuarioLogueado") || "{}"
    );

    const respuesta = await fetch(
      `/api/mascotas?usuario_id=${usuario.id}`
    );

   const datos = await respuesta.json();

      setMascotas(
      Array.isArray(datos) ? datos : []
    );
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  const guardarMascota = async () => {
    if (!nombre || !raza || !edad) return;

    const usuario = JSON.parse(
      localStorage.getItem("usuarioLogueado") || "{}"
    );

    await fetch("/api/mascotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        raza,
        edad: Number(edad),
        usuario_id: usuario.id,
      }),
    });

    setNombre("");
    setRaza("");
    setEdad("");

    cargarMascotas();
  };

  const eliminarMascota = async (id: number) => {
    await fetch("/api/mascotas", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    cargarMascotas();
  };

  const actualizarMascota = async () => {
    if (!editandoId) return;

    await fetch("/api/mascotas", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editandoId,
        nombre,
        raza,
        edad: Number(edad),
      }),
    });

    setEditandoId(null);

    setNombre("");
    setRaza("");
    setEdad("");

    cargarMascotas();
  };

  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-10">
        Mis Mascotas
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          Agregar Mascota
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Raza"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button
            onClick={
              editandoId
                ? actualizarMascota
                : guardarMascota
            }
            className="bg-green-600 text-white p-3 rounded-lg font-bold"
          >
            {editandoId
              ? "Guardar Cambios"
              : "Guardar Mascota"}
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">
          Mascotas Registradas
        </h2>

        <div className="flex flex-col gap-4">
          {mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold">
                🐕 {mascota.nombre}
              </h3>

              <p>Raza: {mascota.raza}</p>

              <p>Edad: {mascota.edad} años</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditandoId(mascota.id);
                    setNombre(mascota.nombre);
                    setRaza(mascota.raza);
                    setEdad(String(mascota.edad));
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    eliminarMascota(mascota.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
