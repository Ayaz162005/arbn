import getCurrentUser from "../libs/getCurrentUser";
import prisma from "../libs/prismadb";
export async function getListing() {
  //   console.log(params, "rttttttu");
  const currentUser = await getCurrentUser();
  const lists = await prisma.listing.findMany({
    where: {
      userId: currentUser?.id,
      //   category: params,
    },
  });

  return lists;
}
