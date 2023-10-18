"use client";
import React from "react";
import Image from "next/image";
import OneElement from "./oneElement";
import { categories } from "./Categories";
import { MdOutlineFilterList } from "react-icons/md";

export default function Filternav() {
  return (
    <div className="flex gap-4 w-full">
      <div className="border-t  flex gap-x-8  overflow-scroll no-scrollbar w-full">
        {categories.map((item, i) => (
          <OneElement name={item.label} icon={item.icon} key={i} />
        ))}
      </div>
      <div className="flex border-2 rounded-xl p-2  items-center justify-center gap-2">
        <MdOutlineFilterList />
        <p>Filters</p>
      </div>
      <div className="flex border-2 rounded-xl p-2  items-center justify-center gap-2 min-w-[250px]">
        <p>Display total before taxes</p>
        <input type="checkbox" />
      </div>
    </div>
  );
}
