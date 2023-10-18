"use client";

import React from "react";
import Image from "next/image";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation"; // Use "next/router" here

export default function OneElement({
  name,
  icon: Icon,
}: {
  name: string;
  icon: IconType;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick() {
    router.push(`/?type=${name}`);
  }

  return (
    <div
      className={`flex flex-col items-center hover:cursor-pointer opacity-60 hover:border-b-2 hover:border-black hover:opacity-80 ${
        searchParams.get("type") == name
          ? "border-b-2 border-black opacity-80"
          : ""
      }`}
      onClick={handleClick}
    >
      <Icon size={26} />
      <p className="text-sm"> {name}</p>
    </div>
  );
}
