import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const paseador_id =
      searchParams.get("paseador_id");

    const resultado = await pool.query(
      `
      SELECT
        p.*,
        u.nombre AS cliente_nombre,
        m.nombre AS mascota_nombre
      FROM paseos p
      LEFT JOIN usuarios u
        ON p.usuario_id = u.id
      LEFT JOIN mascotas m
        ON p.mascota_id = m.id
      WHERE p.paseador_id = $1
      ORDER BY p.fecha ASC
      `,
      [paseador_id]
    );

    return NextResponse.json(
      resultado.rows
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener paseos"
      },
      { status: 500 }
    );
  }
}