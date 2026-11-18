import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const paseador_id =
      searchParams.get("paseador_id");

    let resultado;

    if (paseador_id) {
      resultado = await pool.query(
        `
        SELECT *
        FROM calificaciones
        WHERE paseador_id = $1
        ORDER BY id DESC
        `,
        [paseador_id]
      );
    } else {
      resultado = await pool.query(
        `
        SELECT *
        FROM calificaciones
        ORDER BY id DESC
        `
      );
    }

    return NextResponse.json(resultado.rows);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener calificaciones" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      usuario_id,
      paseador_id,
      estrellas,
      comentario,
    } = body;

    const resultado = await pool.query(
      `
      INSERT INTO calificaciones
      (
        usuario_id,
        paseador_id,
        estrellas,
        comentario
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        usuario_id,
        paseador_id,
        estrellas,
        comentario,
      ]
    );

    return NextResponse.json(resultado.rows[0]);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al guardar calificación" },
      { status: 500 }
    );
  }
}