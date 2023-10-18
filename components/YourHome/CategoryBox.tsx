import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

export default function CategoryBox({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: IconType;
  label: string;
  onClick: (id: any) => void;
  active: string;
}) {
  return (
    <div
      className={`border-2 p-2 rounded-md  box-border cursor-pointer hover:border-black ${active}`}
      onClick={() => onClick(label)}
    >
      <div>
        <Icon size={26} />
      </div>
      <p>{label}</p>
    </div>
  );
}
