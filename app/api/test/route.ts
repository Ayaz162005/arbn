import prisma from "../../libs/prismadb";
import flatted from "flatted";
export async function POST(request: Request) {
  const body = await request.json();
  // console.log(flatted.stringify(prisma));
  const answer = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  // const answer = "sd";
  return Response.json({
    answer,
  });
}
