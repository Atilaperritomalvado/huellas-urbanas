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
        SELECT *
        FROM mascotas
        WHERE usuario_id = $1
        ORDER BY id DESC
        `,
        [usuario_id]
      );
    } else {
      resultado = await pool.query(
        "SELECT * FROM mascotas ORDER BY id DESC"
      );
    }

    return NextResponse.json(resultado.rows);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener mascotas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      raza,
      edad,
      usuario_id,
    } = body;

    const resultado = await pool.query(
      `
      INSERT INTO mascotas
      (
        nombre,
        raza,
        edad,
        usuario_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        nombre,
        raza,
        edad,
        usuario_id,
      ]
    );

    return NextResponse.json(resultado.rows[0]);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al guardar mascota" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, nombre, raza, edad } = body;

    const resultado = await pool.query(
      `
      UPDATE mascotas
      SET nombre = $1,
          raza = $2,
          edad = $3
      WHERE id = $4
      RETURNING *
      `,
      [nombre, raza, edad, id]
    );

    return NextResponse.json(resultado.rows[0]);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al editar mascota" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await pool.query(
      "DELETE FROM mascotas WHERE id = $1",
      [id]
    );

    return NextResponse.json({
      mensaje: "Mascota eliminada",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar mascota" },
      { status: 500 }
    );
  }
}
