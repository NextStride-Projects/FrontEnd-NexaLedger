// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = "tu_secreto";

export function middleware() {
//   const protectedRoutes = ["/resources", "/dashboard"];

//   const token = request.cookies.get("authToken")?.value || request.headers.get("Authorization")?.split("Bearer ")[1];

//   if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//       jwt.verify(token, SECRET_KEY);
//     } catch (error) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
}