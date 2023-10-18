import React from "react";
import { UseFormSetValue } from "react-hook-form";

export default function Describe({
  setValue,
  title,
  description,
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
  title: string;
  description: string;
}) {
  function handleTitle(value: string) {
    setValue("title", value);
  }
  function handleDescription(value: string) {
    setValue("description", value);
  }
  return (
    <div>
      <h2 className="font-bold my-4">How would you describe your place?</h2>
      <input
        type="text"
        value={title}
        className="p-4 border w-full my-4"
        placeholder="Title"
        onChange={(e) => handleTitle(e.target.value)}
        required
      />
      <hr />
      <input
        type="text"
        value={description}
        className="p-4 border w-full my-4"
        placeholder="Description"
        onChange={(e) => handleDescription(e.target.value)}
        required
      />
    </div>
  );
}
