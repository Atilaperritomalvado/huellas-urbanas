import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const resultado = await pool.query(`
      SELECT
        p.*,
        COALESCE(AVG(c.estrellas), 0) AS promedio,
        COUNT(c.id) AS cantidad_comentarios
      FROM paseadores p
      LEFT JOIN calificaciones c
        ON p.id = c.paseador_id
      GROUP BY p.id
      ORDER BY p.nombre ASC
    `);

    return NextResponse.json(resultado.rows);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener paseadores" },
      { status: 500 }
    );
  }
}