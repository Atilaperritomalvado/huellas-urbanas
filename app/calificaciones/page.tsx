"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";

export default function Calificaciones() {
  const [paseadorId, setPaseadorId] = useState("");
  const [estrellas, setEstrellas] = useState("5");
  const [comentario, setComentario] = useState("");

  const enviarCalificacion = async () => {
    const usuario = JSON.parse(
      localStorage.getItem("usuarioLogueado") || "{}"
    );

    await fetch("/api/calificaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuario.id,
        paseador_id: Number(paseadorId),
        estrellas: Number(estrellas),
        comentario,
      }),
    });

    alert("Calificación enviada");

    setPaseadorId("");
    setEstrellas("5");
    setComentario("");
  };

  return (
    
      <main className="min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Calificar Paseador
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">

          <select
            value={paseadorId}
            onChange={(e) =>
              setPaseadorId(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
          >
            <option value="">
              Seleccionar Paseador
            </option>

            <option value="1">
              Carlos Gómez
            </option>

            <option value="2">
              María Fernández
            </option>

            <option value="3">
              Juan Pérez
            </option>

            <option value="4">
              Lucía Romero
            </option>

            <option value="5">
              Diego Molina
            </option>

            <option value="6">
              Valentina Ruiz
            </option>

            <option value="7">
              Martín Castro
            </option>

            <option value="8">
              Sofía López
            </option>

          </select>

          <select
            value={estrellas}
            onChange={(e) =>
              setEstrellas(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <textarea
            placeholder="Escribí tu comentario"
            value={comentario}
            onChange={(e) =>
              setComentario(e.target.value)
            }
            rows={6}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            onClick={enviarCalificacion}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            Enviar Calificación
          </button>

        </div>

      </main>
    
  );
}