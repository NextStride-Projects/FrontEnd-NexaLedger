import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import axios from "axios";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const url = `http://localhost:7001/api/Auth/login`;

  try {
    const { email, password } = await req.json();

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: { email, password },
      }
    );

    const { token } = response.data;

    const res = NextResponse.json({ message: "Login successful" });

    res.headers.append(
      "Set-Cookie",
      serialize("token", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
    );

    return res;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Error interno del servidor";

    console.error("Ocurrió un error durante la petición:", errorMessage);

    return NextResponse.json(
      { message: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}