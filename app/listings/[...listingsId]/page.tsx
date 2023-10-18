// "use client";
import { getListing } from "@/app/actions/getListing";
import useCountries from "@/app/hook/useCountry";
import getCurrentUser from "@/app/libs/getCurrentUser";
import HeartButton from "@/components/HeartButton";
import Image from "next/image";
import React from "react";
import ListingPart from "./ListingPart";
import getReservations from "@/app/actions/getReservations";
export const revalidate = 0;
export default async function Page({
  params,
}: {
  params: { listingsId: string };
}) {
  const { getByValue } = useCountries();
  if (params.listingsId[0] == "api") {
    return null;
  }

  const listing = await getListing(params.listingsId[0]);
  const user = await getCurrentUser();
  const reservations = await getReservations(params.listingsId[0]);
  const countries = getByValue(listing?.locationValue!);
  // revalidate at most every hour
  return (
    <div className="mt-8">
      <ListingPart
        user={user}
        countries={countries}
        listing={listing}
        reservations={reservations}
      />
    </div>
  );
}
