import React from "react";
import { UseFormSetValue } from "react-hook-form";

export default function SomeInformation({
  setValue,
  guestCount,
  roomCount,
  bathroomCount,
}: {
  setValue: UseFormSetValue<{
    category: string;
    location: null;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    price: number;
    title: string;
    description: string;
  }>;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}) {
  function handleIncrease(title: string) {
    if (title == "Guests") {
      setValue("guestCount", guestCount + 1);
    } else if (title == "Rooms") {
      setValue("roomCount", roomCount + 1);
    } else if (title == "Bathrooms") {
      setValue("bathroomCount", bathroomCount + 1);
    }
  }
  function handleDecrease(title: string) {
    if (title == "Guests") {
      if (guestCount != 1) setValue("guestCount", guestCount - 1);
    } else if (title == "Rooms") {
      if (roomCount != 1) setValue("roomCount", roomCount - 1);
    } else if (title == "Bathrooms") {
      if (bathroomCount != 1) setValue("bathroomCount", bathroomCount - 1);
    }
  }

  const element = (title: string, question: string, count: number) => (
    <div className="flex justify-between items-center border-b pb-4">
      <div>
        <p className="font-bold ">{title}</p>
        <p className="text-sm">{question}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-xl border-2 rounded-full flex h-[25px] w-[25px] justify-center items-center p-4"
          onClick={() => handleDecrease(title)}
        >
          -
        </button>
        <div>{count}</div>
        <button
          className="text-xl border-2 rounded-full flex h-[25px] w-[25px] justify-center items-center p-4"
          onClick={() => handleIncrease(title)}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="font-bold my-4">Share some basics about your place</h2>

      <div className="flex flex-col gap-4 ">
        {element("Guests", "How many guests do you home?", guestCount)}
        {element("Rooms", "How many rooms do you home?", roomCount)}
        {element("Bathrooms", "How many bathrooms do you home?", bathroomCount)}
      </div>
    </div>
  );
}
