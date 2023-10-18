import prisma from "../../../libs/prismadb";

export async function GET(req: Request, { params }) {
  console.log(params.reservationId);
  const data = await prisma.reservation.delete({
    where: {
      id: params.reservationId[0],
    },
  });

  return Response.json(data);
}
