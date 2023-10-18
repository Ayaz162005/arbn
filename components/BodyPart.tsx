"use client";
import Image from "next/image";
import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import HeartButton from "./HeartButton";
import useCountries from "@/app/hook/useCountry";
export default function BodyPart({
  item,
  active,
}: {
  item: {
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
  };
  active: boolean | undefined;
}) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const { region, label } = getByValue(item.locationValue);
  return (
    <div
      className="relative"
      onClick={() => router.push(`/listings/${item.id}`)}
    >
      <div className="w-72 relative h-72 overflow-hidden rounded-xl">
        <Image
          src={item.imageSrc}
          fill
          alt="image"
          className="hover:scale-110 cursor-pointer transition-all  overflow-hidden"
        />
      </div>
      <div className="font-bold">
        {label} {region}
      </div>
      <div>{item.category}</div>
      <div className="font-bold">$ {item.price} night</div>
      <HeartButton item={item} active={active} />
    </div>
  );
}
