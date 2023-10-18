import React from "react";
import { UseFormSetValue } from "react-hook-form";

export default function Price({
  price,
  setValue,
}: {
  price: number;
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
}) {
  function handleChange(value: number) {
    setValue("price", value);
  }
  return (
    <div>
      <h2 className="font-bold my-4">Now, set your price</h2>
      <input
        type="number"
        className="w-full border p-4"
        placeholder="Price"
        value={+price}
        onChange={(e) => handleChange(+e.target.value)}
      />
    </div>
  );
}
