import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const { id: companyId } = await params;

    if (!companyId) {
      return NextResponse.json(
        { message: "Resource ID is missing" },
        { status: 400 }
      );
    }
    const url = `http://localhost:7001/api/UsuarioManager/empresa/${companyId}`;
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "No movements found for this resource." },
        { status: 200 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movements:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: `Error fetching movements: ${errorMessage}` },
      { status: 500 }
    );
  }
}