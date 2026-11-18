"use client";
import ProtectedRoute from "../components/ProtectedRoute";
export default function GPS() {
  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Seguimiento GPS
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Ubicación de tu mascota
        </h2>

        <div className="bg-green-100 h-96 rounded-xl flex flex-col items-center justify-center border-4 border-green-500">

          <div className="text-7xl mb-4">
            📍
          </div>

          <h3 className="text-2xl font-bold">
            Mascota Localizada
          </h3>

          <p className="text-gray-600 mt-2">
            Parque Centenario
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="bg-gray-100 p-4 rounded-xl">
            <h3 className="font-bold text-lg">
              Estado
            </h3>

            <p className="text-green-600 font-bold">
              Paseo en curso
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <h3 className="font-bold text-lg">
              Paseador
            </h3>

            <p>Juan Pérez</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <h3 className="font-bold text-lg">
              Latitud
            </h3>

            <p>-34.6037</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <h3 className="font-bold text-lg">
              Longitud
            </h3>

            <p>-58.3816</p>
          </div>

        </div>

        <div className="mt-8 bg-blue-100 p-4 rounded-xl">

          <p className="font-bold">
            Última actualización:
          </p>

          <p>
            Hace 2 minutos
          </p>

        </div>

      </div>

    </main>
    </ProtectedRoute>
  );
}