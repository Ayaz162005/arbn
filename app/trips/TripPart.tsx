"use client";
import Image from "next/image";
import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useCountries from "@/app/hook/useCountry";
import HeartButton from "@/components/HeartButton";
export default function BodyPart({
  item,
}: {
  item: {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: {
      createdAt: string;
      id: string;
      title: string;
      description: string;
      imageSrc: string;
      category: string;
      roomCount: number;
      bathroomCount: number;
      guestCount: number;
      locationValue: string;
      userId: string;
      price: number;
    };
    id: string;
    userId: string;
    listingId: string;
    totalPrice: number;
  };
}) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const { region, label } = getByValue(item.listing.locationValue);
  async function handleDeleteReservation(e, id) {
    e.stopPropagation();
    const res = await fetch(`api/reservations/${id}`);
    console.log(res);

    router.refresh();
  }
  return (
    <div
      className="relative"
      onClick={() => router.push(`/listings/${item.listing.id}`)}
    >
      <div className="w-72 relative h-72 overflow-hidden rounded-xl">
        <Image
          src={item.listing.imageSrc}
          fill
          alt="image"
          className="hover:scale-110 cursor-pointer transition-all  overflow-hidden"
        />
      </div>
      <div className="font-bold">
        {label} {region}
      </div>
      <div>
        {item.startDate} - {item.endDate}
      </div>
      <div className="font-bold">$ {item.listing.price} night</div>
      <button
        className="text-center bg-red-500 text-white w-full rounded-xl p-2 mt-2"
        onClick={(e) => handleDeleteReservation(e, item.id)}
      >
        Delete Reservation
      </button>
    </div>
  );
}
