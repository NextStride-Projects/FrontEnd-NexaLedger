// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { username, password } = body;

//     if (!username || !password) {
//       return NextResponse.json(
//         { message: "Usuario y contraseña son obligatorios" },
//         { status: 400 }
//       );
//     }

//     // Solicitar autenticación al backend
//     const response = await axios.post("http://localhost:3001/login", {
//       username,
//       password,
//     });

//     const { token } = response.data;
//     return NextResponse.json({ token });
//   } catch (error: any) {
//     const errorMessage =
//       error.response?.data?.message || "Error al conectar con el servidor externo";
//     return NextResponse.json({ message: errorMessage }, { status: 500 });
//   }
// }