import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import { IMovement } from "@/app/utils/interfaces/movement/movement";


export async function POST(req: Request): Promise<NextResponse> {
  const resourceUrl = `http://localhost:7004/api/Resource`;
  const movementUrl = `http://localhost:3000/api/movement/create`;

  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const cookie = req.headers.get("cookie");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    if (!cookie) {
      return NextResponse.json(
        { message: "Authentication cookies are missing" },
        { status: 401 }
      );
    }

    const body: Partial<IResource> = await req.json();

    if (
      !body.name ||
      !body.description ||
      !Array.isArray(body.features) ||
      typeof body.available !== "boolean" ||
      typeof body.saleAvailability !== "boolean" ||
      typeof body.category !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid resource structure" },
        { status: 400 }
      );
    }

    const payload = {
      name: body.name,
      description: body.description,
      features: body.features,
      category: body.category,
      available: body.available,
      saleAvailability: body.saleAvailability,
      price: body.price,
      size: body.size,
      image: body.image || "",
    };

    const resourceResponse = await fetch(resourceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resourceResponse.ok) {
      throw new Error(`Failed to create resource: ${resourceResponse.statusText}`);
    }

    const resourceData = await resourceResponse.json();

    const movementPayload: Omit<IMovement, "id" | "timestamp" > = {
      resourceId: resourceData.id,
      userId: resourceData.userId,
      type: "Registro",
      description: "Creación del recurso en la aplicación",
    };

    const movementResponse = await fetch(movementUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(movementPayload),
    });

    if (!movementResponse.ok) {
      console.warn(
        `Movement creation failed: ${movementResponse.statusText}`
      );
    }

    return NextResponse.json(resourceData, { status: 201 });
  } catch (error) {
    console.error("Error creating resource:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: `Error creating resource: ${errorMessage}` },
      { status: 500 }
    );
  }
}
