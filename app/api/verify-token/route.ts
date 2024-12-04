// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = "tu_secreto";

// export async function GET(request: Request) {
//   const token = request.headers.get("Authorization")?.split("Bearer ")[1];

//   if (!token) {
//     return NextResponse.json(
//       { valid: false, message: "Token no proporcionado" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     return NextResponse.json({ valid: true, user: decoded });
//   } catch (error) {
//     return NextResponse.json(
//       { valid: false, message: "Token inválido o expirado" },
//       { status: 401 }
//     );
//   }
// }