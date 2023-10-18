import prisma from "../../libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const hashedPassword = await bcrypt.hash(body.password, 12);
    // const user = "df";
    // const use = await prisma;
    // console.log(use);

    const user = await prisma.user.create({
      data: {
        // firstname: body.firstname,
        // lastname: body.lastname,
        name: "dsdsd",
        email: body.email,
        hashedPassword: hashedPassword,
      },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "User creation failed" }, { status: 500 });
  }
}
