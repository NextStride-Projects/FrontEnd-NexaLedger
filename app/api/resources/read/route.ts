import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (id) {
      const response = await axios.get(`http://localhost:7004/api/Resource/${id}`, {
        headers,
      });
      return NextResponse.json(response.data, { status: 200 });
    } else {
      const response = await axios.get(`http://localhost:7004/api/Resource/`, {
        headers,
      });
      return NextResponse.json(response.data, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching resources:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: `Error fetching resources: ${errorMessage}` },
      { status: 500 }
    );
  }
}