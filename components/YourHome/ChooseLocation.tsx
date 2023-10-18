"use client";
import useCountries from "@/app/hook/useCountry";
import React, { useState, useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import Select from "react-select";
// import Map from "./Map";
// import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";

export default function ChooseLocation({
  setValue,
  location,
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
  location: {
    latlng: [number, number];
  };
}) {
  const { getAll } = useCountries();
  function handleChange(value: any) {
    setValue("location", value);
  }
  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),
    [location]
  );
  return (
    <div>
      <h2 className="my-4 font-bold">Where is your place located?</h2>

      <Select
        placeholder="Anywhere"
        options={getAll()}
        isClearable
        value={location}
        onChange={(value) => handleChange(value)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2 mb-4",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />

      <Map center={location?.latlng} />
    </div>
  );
}
