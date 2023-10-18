"use client";
import { categories } from "@/app/components/Categories";
import useCountries from "@/app/hook/useCountry";
import HeartButton from "@/components/HeartButton";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Range } from "react-date-range";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Reservation } from "@prisma/client";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ListingReservation from "./ListingReservation";
const Map = dynamic(() => import("../../../components/YourHome/Map"), {
  ssr: false,
});
export default function ListingPart({
  user,
  countries,
  listing,
  reservations = [],
}: {
  user: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    hashedPassword: string | null;
    favoriteIds: string[];
  } | null;
  countries:
    | {
        value: string;
        label: string;
        flag: string;
        latlng: [number, number];
        region: string;
      }
    | undefined;
  listing: {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    createdAt: Date;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    userId: string;
    price: number;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      hashedPassword: string | null;
      createdAt: Date;
      updatedAt: Date;
      favoriteIds: string[];
    };
  } | null;
  reservations: Reservation[];
}) {
  const index = categories.findIndex((item) => item.label == listing?.category);

  const IconComponent = categories[index]?.icon;
  const { getByValue } = useCountries();
  const coordinates = getByValue(listing?.locationValue!)?.latlng;

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      console.log(range, "qqqqqqqq");
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const router = useRouter();
  const onCreateReservation = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router]);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);
  return (
    <>
      <div className="font-bold text-2xl">{countries?.label}</div>
      <div className="mb-4">{countries?.region}</div>
      <div className="relative h-[450px]">
        <Image
          src={listing?.imageSrc || ""}
          //   width={700}
          //   height={20}
          fill
          alt="picture"
          className="block"
        />
        <HeartButton
          item={listing}
          active={user?.favoriteIds.includes(listing?.id!)}
        />
      </div>
      <div className="font-bold flex items-center mt-4 gap-4">
        Hashed by {listing?.user.name}
        <Image
          src={listing?.user.image || "/images/placeholder.jpg"}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full"
        />
      </div>
      <div className="grid gap-4  grid-cols-2">
        <div>
          <div className="flex gap-4 mb-4">
            <span>{listing?.guestCount} guests</span>
            <span>{listing?.roomCount} rooms</span>
            <span>{listing?.bathroomCount} bathrooms</span>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <IconComponent size={40} />
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                {" "}
                {categories[index].label}
              </span>
              <span>{categories[index].description}</span>
            </div>
          </div>
          <div className="w-[100%] h-96 my-8">
            <Map center={coordinates!} />
          </div>
        </div>
        <div>
          <ListingReservation
            price={listing?.price!}
            totalPrice={totalPrice!}
            onChangeDate={(value: any) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </>
  );
}
