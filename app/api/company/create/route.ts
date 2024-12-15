import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: Request): Promise<NextResponse> {
  const resourceUrl = `http://localhost:7001/api/Auth/register/user`;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const resourceResponse = await axios.post(resourceUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (resourceResponse.status !== 201) {
      throw new Error(`Failed to create user: ${resourceResponse.statusText}`);
    }

    console.info("User created successfully", resourceResponse.data);
    return NextResponse.json(resourceResponse.data, { status: 201 });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error during user creation", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error during user creation", {
        message: error.message,
        stack: error.stack,
      });
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: `Error creating user: ${errorMessage}` },
      { status: 500 }
    );
  }
}