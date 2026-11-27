export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      <header className="bg-slate-900 text-white px-4 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">

        <h1 className="text-3xl font-bold">
          🐾 Huellas Urbanas
        </h1>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 font-medium">
          <a href="#">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/login"
            className="bg-white text-slate-900 px-5 py-2 rounded-lg font-bold"
          >
            Iniciar Sesión
          </a>

          <a
            href="/registro"
            className="bg-green-600 px-5 py-2 rounded-lg font-bold"
          >
            Registrarse
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white py-20 md:py-28 px-4 md:px-10 text-center">

        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">

          Cuidado inteligente para tu mascota
        </h2>

        <p className="text-2xl max-w-4xl mx-auto">
          Gestioná mascotas, programá paseos,
          seleccioná paseadores verificados
          y seguí cada actividad desde una
          única plataforma.
        </p>

        <div className="flex justify-center gap-6 mt-10">

          <a
            href="/registro"
            className="bg-green-600 px-8 py-4 rounded-xl font-bold text-lg"
          >
            Crear Cuenta
          </a>

          <a
            href="/login"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg"
          >
            Ingresar
          </a>

        </div>

      </section>

      <section
        id="servicios"
        className="py-20 px-10"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Servicios Principales
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">
              🐕
            </div>

            <h3 className="text-2xl font-bold">
              Mascotas
            </h3>

            <p className="mt-3 text-gray-600">
              Gestioná toda la información
              de tus mascotas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">
              📅
            </div>

            <h3 className="text-2xl font-bold">
              Paseos
            </h3>

            <p className="mt-3 text-gray-600">
              Programá y administrá paseos
              fácilmente.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">
              👨‍🦱
            </div>

            <h3 className="text-2xl font-bold">
              Paseadores
            </h3>

            <p className="mt-3 text-gray-600">
              Profesionales verificados y
              calificados por usuarios.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">
              📍
            </div>

            <h3 className="text-2xl font-bold">
              GPS
            </h3>

            <p className="mt-3 text-gray-600">
              Seguimiento y monitoreo de
              cada paseo.
            </p>
          </div>

        </div>

      </section>

      <section
        id="beneficios"
        className="bg-slate-900 text-white py-20 px-10"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          ¿Por qué elegir Huellas Urbanas?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              🔒 Seguridad
            </h3>

            <p>
              Acceso protegido para cada
              usuario y datos separados.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              ⭐ Calidad
            </h3>

            <p>
              Paseadores con experiencia,
              comentarios y valoraciones.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              💙 Confianza
            </h3>

            <p>
              Toda la actividad de tu mascota
              organizada en un solo lugar.
            </p>
          </div>

        </div>

      </section>

      <footer
        id="contacto"
        className="bg-black text-white text-center py-12"
      >
        <h3 className="text-3xl font-bold">
          🐾 Huellas Urbanas
        </h3>

        <p className="mt-4">
          Plataforma inteligente para el cuidado
          y seguimiento de mascotas.
        </p>

        <p className="mt-6 text-gray-400">
          © 2026 Huellas Urbanas - Todos los derechos reservados
        </p>
      </footer>

    </main>
  );
}