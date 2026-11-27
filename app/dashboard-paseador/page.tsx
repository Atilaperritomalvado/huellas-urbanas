"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Paseo = {
  id: number;
  fecha: string;
  hora: string;
  lugar: string;
  cliente_nombre: string;
  mascota_nombre: string;
  estado: string;
};

type Calificacion = {
  id: number;
  estrellas: number;
  comentario: string;
};

export default function DashboardPaseador() {
  const [nombre, setNombre] = useState("");
  const [paseadorId, setPaseadorId] = useState<number | null>(null);

  const [paseos, setPaseos] = useState<Paseo[]>([]);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);

  const router = useRouter();

  const cargarPaseos = async (id: number) => {
    const respuesta = await fetch(
      `/api/paseos-paseador?paseador_id=${id}`
    );

    const datos = await respuesta.json();

    setPaseos(
      Array.isArray(datos) ? datos : []
    );
  };

  const cargarCalificaciones = async (
    id: number
  ) => {
    const respuesta = await fetch(
      `/api/calificaciones?paseador_id=${id}`
    );

    const datos = await respuesta.json();

    setCalificaciones(
      Array.isArray(datos) ? datos : []
    );
  };

  const cambiarEstado = async (
    id: number,
    estado: string
  ) => {
    await fetch("/api/estado-paseo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        estado,
      }),
    });

    if (paseadorId) {
      cargarPaseos(paseadorId);
    }
  };

  useEffect(() => {
    const paseador =
      localStorage.getItem(
        "paseadorLogueado"
      );

    if (!paseador) {
      router.push("/login-paseador");
      return;
    }

    const datos = JSON.parse(paseador);

    setNombre(datos.nombre);
    setPaseadorId(datos.paseador_id);

    cargarPaseos(datos.paseador_id);
    cargarCalificaciones(
      datos.paseador_id
    );
  }, [router]);

  const cerrarSesion = () => {
    localStorage.removeItem(
      "paseadorLogueado"
    );

    router.push("/login-paseador");
  };

  const promedio =
    calificaciones.length > 0
      ? (
          calificaciones.reduce(
            (total, c) =>
              total + c.estrellas,
            0
          ) / calificaciones.length
        ).toFixed(1)
      : "0.0";

  const pendientes = paseos.filter(
    (p) => p.estado === "Pendiente"
  ).length;

  const enCurso = paseos.filter(
    (p) => p.estado === "En curso"
  ).length;

  const finalizados = paseos.filter(
    (p) => p.estado === "Finalizado"
  ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">

   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Dashboard Paseador
          </h1>

          <p className="text-xl text-gray-600">
            Bienvenido {nombre}
          </p>
        </div>

        <button
          onClick={cerrarSesion}
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Cerrar Sesión
        </button>

        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            📅 Paseos Asignados
          </h2>

          {paseos.length > 0 ? (
            paseos.map((paseo) => (
              <div
                key={paseo.id}
                className="border-b py-3"
              >
                <p>
                  📍 {paseo.lugar}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    paseo.fecha
                  ).toLocaleDateString(
                    "es-AR"
                  )}
                </p>

                <p>
                  🕒 {paseo.hora}
                </p>

                <p>
                  👤 Cliente:{" "}
                  {paseo.cliente_nombre}
                </p>

                <p>
                  🐕 Mascota: {paseo.mascota_nombre || "No especificada"}
                </p>

                <p>
                  Estado:{" "}
                  <strong>
                    {paseo.estado}
                  </strong>
                </p>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">

                  <button
                    onClick={() =>
                      cambiarEstado(
                        paseo.id,
                        "Pendiente"
                      )
                    }
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Pendiente
                  </button>

                  <button
                    onClick={() =>
                      cambiarEstado(
                        paseo.id,
                        "En curso"
                      )
                    }
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    En curso
                  </button>

                  <button
                    onClick={() =>
                      cambiarEstado(
                        paseo.id,
                        "Finalizado"
                      )
                    }
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Finalizado
                  </button>

                </div>

              </div>
            ))
          ) : (
            <p>
              No hay paseos asignados.
            </p>
          )}

        </div>

      <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-3">
            ⭐ Calificaciones
          </h2>

          {calificaciones.length > 0 ? (
            <>
              <p className="text-4xl md:text-5xl font-bold text-yellow-500">
                {promedio}
              </p>

              <p className="mt-2">
                Promedio General
              </p>

              <p className="mt-2">
                Total opiniones:{" "}
                {calificaciones.length}
              </p>
            </>
          ) : (
            <p>
              Sin calificaciones.
            </p>
          )}

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-3">
            💬 Comentarios
          </h2>

          {calificaciones.length > 0 ? (
            calificaciones.map((c) => (
              <div
                key={c.id}
                className="border-b py-3 break-words"
              >
                <p>
                  {"⭐".repeat(
                    c.estrellas
                  )}
                </p>

                <p>
                  {c.comentario}
                </p>
              </div>
            ))
          ) : (
            <p>
              Sin comentarios todavía.
            </p>
          )}

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            📊 Estadísticas
          </h2>

          <div className="space-y-3">

            <p className="font-semibold">
              📅 Total Paseos:{" "}
              {paseos.length}
            </p>

            <p className="text-yellow-600 font-semibold">
              🟡 Pendientes:{" "}
              {pendientes}
            </p>

            <p className="text-blue-600 font-semibold">
              🔵 En curso:{" "}
              {enCurso}
            </p>

            <p className="text-green-600 font-semibold">
              ✅ Finalizados:{" "}
              {finalizados}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}