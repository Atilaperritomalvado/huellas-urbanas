import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const resultado = await pool.query(
      `
      SELECT
        up.*,
        p.nombre
      FROM usuarios_paseadores up
      INNER JOIN paseadores p
        ON up.paseador_id = p.id
      WHERE email = $1
      AND password = $2
      `,
      [email, password]
    );

    if (resultado.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Credenciales incorrectas",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      resultado.rows[0]
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al iniciar sesión",
      },
      { status: 500 }
    );
  }
}