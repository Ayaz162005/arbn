import prisma from "../../libs/prismadb";
import getCurrentUser from "@/app/libs/getCurrentUser";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //     return NextResponse.error();
  //   }
  console.log(currentUser);
  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser?.id as string,
      // userId: "6523f0fc67199ca5ef7de8f8",
    },
  });
  console.log("eeeee");
  return NextResponse.json(listing);
}
