import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

function decodeAndValidateToken(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded || !decoded.exp) {
      throw new Error("Invalid token structure");
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < currentTime) {
      return false; // Token has expired
    }

    return true; // Token is valid
  } catch (error) {
    console.error("Error decoding token:", (error as Error).message);
    return false;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token && decodeAndValidateToken(token)) {
    return;
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: ["/business/:path*", "/resources/:path*"],
  };
  
