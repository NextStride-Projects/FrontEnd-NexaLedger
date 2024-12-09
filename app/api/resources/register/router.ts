import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";

export async function POST(req: Request): Promise<NextResponse> {
  const url = `http://localhost:7004/api/Resource`;

  try {
    // Parseamos el cuerpo de la solicitud
    const body: IResource = await req.json();

    // Validar que el cuerpo tenga la estructura esperada
    if (
      !body.name ||
      !body.description ||
      !body.features ||
      !Array.isArray(body.features) ||
      typeof body.available !== "boolean" ||
      typeof body.saleAvailability !== "boolean" ||
      typeof body.price !== "number" ||
      typeof body.size !== "number" ||
      !body.image
    ) {
      return NextResponse.json(
        { message: "Invalid resource structure" },
        { status: 400 }
      );
    }

    // Realizamos la petición POST al backend
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create resource");
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { message: "Error creating resource" },
      { status: 500 }
    );
  }
}