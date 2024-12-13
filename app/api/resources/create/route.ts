import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";

export async function POST(req: Request): Promise<NextResponse> {
  const url = `http://localhost:7004/api/Resource`;

  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const body: Partial<IResource> = await req.json();

    // Validate the required fields
    if (
      !body.name ||
      !body.description ||
      !Array.isArray(body.features) ||
      typeof body.available !== "boolean" ||
      typeof body.saleAvailability !== "boolean" ||
      typeof body.price !== "number" ||
      typeof body.size !== "number" ||
      typeof body.category !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid resource structure" },
        { status: 400 }
      );
    }

    // Prepare payload for the API
    const payload = {
      name: body.name,
      description: body.description,
      features: body.features,
      category: body.category,
      available: body.available,
      saleAvailability: body.saleAvailability,
      price: body.price,
      size: body.size,
      image: body.image || "", // Default empty string if image is missing
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create resource: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
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