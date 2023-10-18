"use client";
import React from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { UseFormSetValue } from "react-hook-form";
export default function ImageChoose({
  value,
  setValue,
}: {
  value: string;
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
  function handleUpload(result: any) {
    setValue("imageSrc", result.info.secure_url);
  }
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="o5xlvhts"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="relative 
           cursor-pointer
           hover:opacity-70
           transition
           border-dashed
            border-2
            p-20
            border-neutral-300
            flex 
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            
           "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
