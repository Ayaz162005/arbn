import React from "react";
import getCurrentUser from "../libs/getCurrentUser";
import getReservations from "../actions/getReserveUser";
import TripPart from "./TripPart";

export default async function page() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const reservations = await getReservations(user.id);
  console.log(reservations);
  return (
    <div className="grid grid-cols-2 gap-8">
      {reservations.map((item) => (
        <TripPart key={item.createdAt} item={item} />
      ))}
    </div>
  );
}
