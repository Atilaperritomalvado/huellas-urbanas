"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";

type Paseo = {
  id: number;
  fecha: string;
  hora: string;
  lugar: string;
  estado?: string;

  paseador_id?: number;
  mascota_id?: number;

  paseador_nombre?: string;
  paseador_estrellas?: number;
  paseador_experiencia?: string;

  mascota_nombre?: string;
};

type Paseador = {
  id: number;
  nombre: string;
  estrellas: number;
  experiencia: string;
};

type Mascota = {
  id: number;
  nombre: string;
};

export default function Paseos() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");

  const [paseadorId, setPaseadorId] = useState("");
  const [mascotaId, setMascotaId] = useState("");

  const [paseos, setPaseos] = useState<Paseo[]>([]);
  const [paseadores, setPaseadores] = useState<Paseador[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    cargarPaseos();
    cargarPaseadores();
    cargarMascotas();
  }, []);

 const cargarPaseos = async () => {
  const usuario = JSON.parse(
    localStorage.getItem("usuarioLogueado") || "{}"
   );

  const respuesta = await fetch(
    `/api/paseos?usuario_id=${usuario.id}`
   );

  const datos = await respuesta.json();

   console.log("PASEOS:", datos);

   setPaseos(
    Array.isArray(datos) ? datos : []
   );
  };

  const cargarPaseadores = async () => {
  const respuesta = await fetch(
    "/api/paseadores"
  );

  const datos = await respuesta.json();

   console.log("PASEADORES:", datos);

   setPaseadores(
    Array.isArray(datos) ? datos : []
   );
  };

   const cargarMascotas = async () => {
   const usuario = JSON.parse(
    localStorage.getItem("usuarioLogueado") || "{}"
  );

  const respuesta = await fetch(
    `/api/mascotas?usuario_id=${usuario.id}`
   );

   const datos = await respuesta.json();

   console.log("MASCOTAS:", datos);

   setMascotas(
    Array.isArray(datos) ? datos : []
    );
   };

  const guardarPaseo = async () => {
    if (
      !fecha ||
      !hora ||
      !lugar ||
      !paseadorId ||
      !mascotaId
    ) {
      return;
    }

    const usuario = JSON.parse(
      localStorage.getItem("usuarioLogueado") || "{}"
    );

    await fetch("/api/paseos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha,
        hora,
        lugar,
        usuario_id: usuario.id,
        paseador_id: Number(paseadorId),
        mascota_id: Number(mascotaId),
      }),
    });

    setFecha("");
    setHora("");
    setLugar("");
    setPaseadorId("");
    setMascotaId("");

    cargarPaseos();
  };

  const actualizarPaseo = async () => {
    if (!editandoId) return;

    await fetch("/api/paseos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editandoId,
        fecha,
        hora,
        lugar,
        paseador_id: Number(paseadorId),
        mascota_id: Number(mascotaId),
      }),
    });

    setEditandoId(null);

    setFecha("");
    setHora("");
    setLugar("");
    setPaseadorId("");
    setMascotaId("");

    cargarPaseos();
  };

  const eliminarPaseo = async (
    id: number
  ) => {
    await fetch("/api/paseos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    cargarPaseos();
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Mis Paseos
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl">

          <h2 className="text-2xl font-bold mb-6">
            Programar Paseo
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="time"
              value={hora}
              onChange={(e) =>
                setHora(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Lugar del paseo"
              value={lugar}
              onChange={(e) =>
                setLugar(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <select
              value={mascotaId}
              onChange={(e) =>
                setMascotaId(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                Seleccionar Mascota
              </option>

              {mascotas.map((mascota) => (
                <option
                  key={mascota.id}
                  value={mascota.id}
                >
                  🐕 {mascota.nombre}
                </option>
              ))}
            </select>

            <select
              value={paseadorId}
              onChange={(e) =>
                setPaseadorId(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                Seleccionar Paseador
              </option>

              {paseadores.map(
                (paseador) => (
                  <option
                    key={paseador.id}
                    value={paseador.id}
                  >
                    ⭐ {paseador.estrellas}
                    {" - "}
                    {paseador.nombre}
                    {" - "}
                    {paseador.experiencia}
                  </option>
                )
              )}
            </select>

            <button
              onClick={
                editandoId
                  ? actualizarPaseo
                  : guardarPaseo
              }
              className="bg-blue-600 text-white p-3 rounded-lg font-bold"
            >
              {editandoId
                ? "Guardar Cambios"
                : "Agendar Paseo"}
            </button>

          </div>
        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Paseos Programados
          </h2>

          <div className="flex flex-col gap-4">

            {paseos.map((paseo) => (
              <div
                key={paseo.id}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
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
                  📍 {paseo.lugar}
                </p>

                <p>
                  👨‍🦱 Paseador:{" "}
                  {paseo.paseador_nombre ||
                    "Sin asignar"}
                </p>
                <p>
                  🐕 Mascota:
                  {" "}
                  {paseo.mascota_nombre || "No especificada"}
                </p>

                <p>
                  ⭐{" "}
                  {paseo.paseador_estrellas ||
                    "-"}{" "}
                  estrellas
                </p>

                <p className="font-bold mt-2">

                {paseo.estado === "Pendiente" && (
                <span className="text-yellow-600">
                🟡 Pendiente
                </span>
                )}

                {paseo.estado === "En curso" && (
                <span className="text-blue-600">
                🔵 En curso
                </span>
                )}

                {paseo.estado === "Finalizado" && (
                <span className="text-green-600">
                ✅ Finalizado
               </span>
                )}

                </p>
                {paseo.estado === "Finalizado" && (

                <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3"
                onClick={() => {
                 window.location.href =
               "/calificaciones";
                }}
                >
               ⭐ Calificar Paseador
                </button>

                )}

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => {
                      setEditandoId(
                        paseo.id
                      );

                      setFecha(
                        paseo.fecha.split(
                          "T"
                        )[0]
                      );

                      setHora(
                        paseo.hora
                      );

                      setLugar(
                        paseo.lugar
                      );

                      setPaseadorId(
                        String(
                          paseo.paseador_id ??
                            ""
                        )
                      );
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      eliminarPaseo(
                        paseo.id
                      )
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