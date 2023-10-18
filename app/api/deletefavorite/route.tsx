import getCurrentUser from "@/app/libs/getCurrentUser";
import prisma from "../../libs/prismadb";
export async function POST(req: Request) {
  console.log("ooooooooo");
  return Response.json({ id: "sdsds" });
  // const body = await req.json();
  // console.log(body, "ttttttttttt");
  // const currentUser = await getCurrentUser();

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: currentUser?.id,
  //   },
  // });

  // if (user) {
  //   const indexToRemove = user.favoriteIds.indexOf(body.id);

  //   if (indexToRemove !== -1) {
  //     user.favoriteIds.splice(indexToRemove, 1);

  //     await prisma.user.update({
  //       where: {
  //         id: currentUser?.id,
  //       },
  //       data: {
  //         favoriteIds: user.favoriteIds,
  //       },
  //     });
  //   }

  //   console.log(user.favoriteIds); // Log the modified favoriteIds
  // }

  // return Response.json(body);
}
