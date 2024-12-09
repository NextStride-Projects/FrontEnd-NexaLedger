import { NextResponse } from "next/server";
import { IResource } from "@/app/utils/interfaces/resources/resources";

export async function GET(): Promise<NextResponse> {
  const url = `http://localhost:7004/api/Resource`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }

    const data: IResource[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { message: "Error fetching resources" },
      { status: 500 }
    );
  }
}