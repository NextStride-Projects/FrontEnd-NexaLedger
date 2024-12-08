import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { IRegisterUser } from "@/app/utils/interfaces/auth/register";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const urlCompany = `http://localhost:7001/api/Auth/register/empresa`;
  const urlUser = `http://localhost:7001/api/Auth/register/user`;

  try {
    const empresaData = await req.json();

    console.log("Enviando solicitud para registrar empresa...");
    const companyResponse = await fetch(urlCompany, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData.company),
    });

    if (!companyResponse.ok) {
      const errorData = await companyResponse.json();
      console.error("Error en el registro de la empresa:", errorData);
      throw new Error(errorData.message || "Error al registrar la empresa");
    }

    const companyData = await companyResponse.json();
    const companyId = companyData.empresaId;

    if (!companyId) {
      throw new Error("No se recibió el ID de la empresa en la respuesta");
    }

    const userData: IRegisterUser = {
      ...empresaData.userData as Omit<IRegisterUser, "empresaId">,
      empresaId: companyId,
    };

    const userResponse = await fetch(urlUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error("Error en el registro del usuario:", errorData);
      throw new Error(errorData.message || "Error al registrar el usuario");
    }

    const userDataResponse = await userResponse.json();
    const { token } = userDataResponse;

    const res = NextResponse.json({ message: "Registro exitoso" });

    res.headers.append(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
    );

    return res;
  } catch (error: any) {
    console.error("Ocurrió un error durante la operación:", error.message);
    return NextResponse.json(
      { message: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}