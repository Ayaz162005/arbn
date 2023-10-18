import getCurrentUser from "@/app/libs/getCurrentUser";
import prisma from "../../libs/prismadb";
export async function POST(req: Request) {
  const body = await req.json();

  const currentUser = await getCurrentUser();
  await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favoriteIds: {
        push: body.id,
      },
    },
  });

  return Response.json(body);
}
