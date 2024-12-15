import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(_req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`http://localhost:7001/api/EmpresaManager`, {
      headers,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: `Error fetching details: ${errorMessage}` },
      { status: 500 }
    );
  }
}