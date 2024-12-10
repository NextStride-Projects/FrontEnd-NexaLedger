import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(): Promise<NextResponse> {
  const res = NextResponse.json({ message: "Logout successful" });

  res.headers.append(
    "Set-Cookie",
    serialize("token", "", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(-1),
    })
  );

  return res;
}