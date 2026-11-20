import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios ORDER BY id DESC"
    );

    return NextResponse.json(resultado.rows);
  } catch (error) {
   console.error(error);

return NextResponse.json(
  {
    error,
  },
  { status: 500 }
  );
  }
  }

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nombre, email, password } = body;

    const resultado = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [nombre, email, password]
    );

    return NextResponse.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}