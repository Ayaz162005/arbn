import prisma from "../libs/prismadb";
export async function getListing(param: string) {
  if (param.length < 8) {
    // console.log(param, "sdsdsd");
    return null;
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: param,
    },
    include: {
      user: true,
    },
  });
  if (!listing) {
    console.log("wwwwww");
    return null;
  }

  return listing;
}
