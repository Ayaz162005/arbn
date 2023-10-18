"use client";
import React, { useState } from "react";
import { categories } from "@/app/components/Categories";
import CategoryBox from "./CategoryBox";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
export default function ChooseCategory({
  setValue,
  category,
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
  category: string;
}) {
  const [choose, setchoose] = useState(null);

  function handleClick(e: any) {
    // setchoose(e);
    setValue("category", e);
  }
  return (
    <div>
      <h2 className="font-bold my-2">
        Which of these best description your place
      </h2>
      <div className="mb-4">Pick a category</div>
      <div className="grid grid-cols-2 gap-2 overflow-scroll p-4 max-h-[300px]">
        {categories.map((item, i) => (
          <CategoryBox
            key={i}
            icon={item.icon}
            label={item.label}
            onClick={(label: any) => handleClick(label)}
            active={`${item.label == category ? "border-black" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
