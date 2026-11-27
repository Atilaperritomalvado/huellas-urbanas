"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";

type Paseador = {
  id: number;
  nombre: string;
  estrellas: number;
  experiencia: string;
  comentarios: string;
  promedio: number;
  cantidad_comentarios: number;
};

type Calificacion = {
  id: number;
  paseador_id: number;
  estrellas: number;
  comentario: string;
};

export default function Paseadores() {
  const [paseadores, setPaseadores] = useState<Paseador[]>([]);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);

  useEffect(() => {
    cargarPaseadores();
    cargarCalificaciones();
  }, []);

  const cargarPaseadores = async () => {
    const respuesta = await fetch("/api/paseadores");
    const datos = await respuesta.json();

    setPaseadores(
    Array.isArray(datos) ? datos : []
    );
  };

  const cargarCalificaciones = async () => {
    const respuesta = await fetch("/api/calificaciones");
    const datos = await respuesta.json();

    setCalificaciones(
      Array.isArray(datos) ? datos : []
    );
  };

  return (
    <ProtectedRoute>
        <main className="min-h-screen bg-gray-100 p-4 md:p-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">
          Nuestros Paseadores
        </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {paseadores.map((paseador) => (
            <div
              key={paseador.id}
              className="bg-white p-5 md:p-6 rounded-xl shadow-lg"
            >
             <div className="text-4xl md:text-5xl mb-4">
                🐕
              </div>

              <h2 className="text-xl md:text-2xl font-bold">
                {paseador.nombre}
              </h2>

              <p className="mt-2">
                ⭐ {paseador.estrellas} estrellas
              </p>

              <p className="mt-2">
                📋 {paseador.experiencia}
              </p>

              <p className="mt-2 font-bold text-blue-600">
                ⭐ Promedio:
                {" "}
                {Number(paseador.promedio).toFixed(1)}
              </p>

              <p className="mt-2">
                💬 Comentarios:
                {" "}
                {paseador.cantidad_comentarios}
              </p>

              <p className="mt-4 text-gray-600">
                "{paseador.comentarios}"
              </p>

              <div className="mt-6 border-t pt-4">

                <h3 className="font-bold mb-3">
                  Últimas Opiniones
                </h3>

                {calificaciones
                  .filter(
                    (c) =>
                      c.paseador_id === paseador.id
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      className="bg-gray-100 p-3 rounded-lg mb-2"
                    >
                      <p>
                        {"⭐".repeat(c.estrellas)}
                      </p>

                      <p className="text-gray-700">
                        "{c.comentario}"
                      </p>
                    </div>
                  ))}

                {calificaciones.filter(
                  (c) =>
                    c.paseador_id === paseador.id
                ).length === 0 && (
                  <p className="text-gray-500">
                    Sin comentarios todavía.
                  </p>
                )}

              </div>
            </div>
          ))}

        </div>

      </main>
    </ProtectedRoute>
  );
}