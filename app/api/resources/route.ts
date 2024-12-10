import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import { cookies } from "next/headers";

export async function POST(req: Request): Promise<NextResponse> {
  const url = `http://localhost:7004/api/Resource`;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const body: Omit<IResource, "id"> = await req.json();
    if (
      !body.name ||
      !body.description ||
      !body.features ||
      !Array.isArray(body.features) ||
      typeof body.available !== "boolean" ||
      typeof body.saleAvailability !== "boolean" ||
      !body.image
    ) {
      return NextResponse.json(
        { message: "Invalid resource structure" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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