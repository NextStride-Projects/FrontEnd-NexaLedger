import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import { cookies } from "next/headers";
import axios from "axios";

export async function PUT(req: Request, context: { params: { id: string } }): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const body: IResource = await req.json();

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

    const { id } = context.params;
    const url = `http://localhost:7004/api/Resource/${id}`;

    const { data } = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating resource:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: `Error updating resource: ${errorMessage}` },
      { status: 500 }
    );
  }
}