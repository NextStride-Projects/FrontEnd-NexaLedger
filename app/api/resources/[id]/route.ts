import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import { cookies } from "next/headers";
import axios from "axios";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.warn("Authentication token is missing");
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
      typeof body.saleAvailability !== "boolean"
    ) {
      console.warn("Invalid resource structure", { body });
      return NextResponse.json(
        { message: "Invalid resource structure" },
        { status: 400 }
      );
    }
    
    const { id } = await context.params;
    const url = `http://localhost:7004/api/Resource/${id}`;
    console.info(`Updating resource with ID: ${id}`, { url, body });

    const { data } = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.info(`Resource with ID ${id} updated successfully`);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error during resource update", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error during resource update", {
        message: error.message,
        stack: error.stack,
      });
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: `Error updating resource: ${errorMessage}` },
      { status: 500 }
    );
  }
}
