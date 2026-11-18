import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const usuario_id = searchParams.get("usuario_id");

    let resultado;

    if (usuario_id) {
      resultado = await pool.query(
        `
        SELECT
          p.*,
          pa.nombre AS paseador_nombre,
          pa.estrellas AS paseador_estrellas,
          pa.experiencia AS paseador_experiencia,
          m.nombre AS mascota_nombre
        FROM paseos p
        LEFT JOIN paseadores pa
          ON p.paseador_id = pa.id
        LEFT JOIN mascotas m
          ON p.mascota_id = m.id
        WHERE p.usuario_id = $1
        ORDER BY p.id DESC
        `,
        [usuario_id]
      );
    } else {
      resultado = await pool.query(
        `
        SELECT
          p.*,
          pa.nombre AS paseador_nombre,
          pa.estrellas AS paseador_estrellas,
          pa.experiencia AS paseador_experiencia,
          m.nombre AS mascota_nombre
        FROM paseos p
        LEFT JOIN paseadores pa
          ON p.paseador_id = pa.id
        LEFT JOIN mascotas m
        ON p.mascota_id = m.id
        ORDER BY p.id DESC
        `
      );
    }

    return NextResponse.json(resultado.rows);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener paseos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fecha,
      hora,
      lugar,
      usuario_id,
      paseador_id,
      mascota_id,
    } = body;

    const resultado = await pool.query(
      `
      INSERT INTO paseos
      (
        fecha,
        hora,
        lugar,
        usuario_id,
        paseador_id,
        mascota_id
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        fecha,
        hora,
        lugar,
        usuario_id,
        paseador_id,
        mascota_id,
      ]
    );

    return NextResponse.json(
      resultado.rows[0]
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al guardar paseo" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      fecha,
      hora,
      lugar,
      paseador_id,
      mascota_id,
    } = body;

    const resultado = await pool.query(
      `
      UPDATE paseos
      SET fecha = $1,
          hora = $2,
          lugar = $3,
          paseador_id = $4,
          mascota_id = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        fecha,
        hora,
        lugar,
        paseador_id,
        mascota_id,
        id,
      ]
    );

    return NextResponse.json(
      resultado.rows[0]
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al editar paseo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await pool.query(
      "DELETE FROM paseos WHERE id = $1",
      [id]
    );

    return NextResponse.json({
      mensaje: "Paseo eliminado",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar paseo" },
      { status: 500 }
    );
  }
}