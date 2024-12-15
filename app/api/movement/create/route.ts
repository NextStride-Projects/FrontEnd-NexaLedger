import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { IMovement } from "@/app/utils/interfaces/movement/movement";
import axios from "axios";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const body: IMovement = await req.json();

    if (!body.resourceId || !body.type || !body.description) {
      return NextResponse.json(
        { message: "Missing required fields: resourceId, type, or description" },
        { status: 400 }
      );
    }

    const url = `http://localhost:7004/api/Movement`;
    const { data } = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating movement:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: `Error creating movement: ${errorMessage}` },
      { status: 500 }
    );
  }
}