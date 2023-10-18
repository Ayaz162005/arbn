import prisma from "../libs/prismadb";

export default async function getReservations(params: string) {
  const reservations = await prisma.reservation.findMany({
    where: {
      userId: params,
    },
    include: {
      listing: true,
    },
  });

  const safeReservations = reservations.map((reservation) => ({
    ...reservation,
    createdAt: reservation.createdAt.toISOString(),
    startDate: reservation.startDate.toISOString(),
    endDate: reservation.endDate.toISOString(),
    listing: {
      ...reservation.listing,
      createdAt: reservation.listing.createdAt.toISOString(),
    },
  }));

  return safeReservations;
}
