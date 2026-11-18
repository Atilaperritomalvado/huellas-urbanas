import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { id, estado } =
      await req.json();

    const resultado = await pool.query(
      `
      UPDATE paseos
      SET estado = $1
      WHERE id = $2
      RETURNING *
      `,
      [estado, id]
    );

    return NextResponse.json(
      resultado.rows[0]
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Error al actualizar estado",
      },
      { status: 500 }
    );
  }
}