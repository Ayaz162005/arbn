"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Logindialog from "./Logindialog";
import { useSession, signOut } from "next-auth/react";
import MainPage from "./YourHome/MainPage";
import ModelLogin from "./ModelLogin";
import Model from "./Model";
import { useRouter } from "next/navigation";
export default function Navbar() {
  let [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { data } = useSession();
  // signOut();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !buttonRef.current?.contains(event.target as Node) &&
      !menuRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleEscKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };
  function handleClick() {
    setIsOpen2(true);
    setIsOpen(false);
  }
  const router = useRouter();
  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKeyPress);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);
  return (
    <div className="pt-2 flex justify-between items-center relative">
      <div>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={170}
          height={170}
          onClick={() => router.push("/")}
        />
      </div>
      <div className="flex gap-2">
        {data ? (
          <button onClick={() => setIsOpen3((t) => !t)}>Arbn your home</button>
        ) : (
          ""
        )}
        <button
          ref={buttonRef}
          className="border border-stone-700 w-20 h-10 flex justify-between items-center rounded-full p-2 cursor-pointer hover:shadow-2xl shadow-black"
          onClick={() => setIsOpen((t) => !t)}
        >
          <FaBars size={20} />
          <Image
            src={`${
              data?.user?.image ? data?.user?.image : "/images/placeholder.jpg"
            }`}
            width={30}
            height={30}
            alt="placeholder"
            className="rounded-full"
          />
        </button>
      </div>
      {isOpen && data && (
        <ModelLogin menuRef={menuRef} handleClick={handleClick} />
      )}
      {isOpen && !data && <Model menuRef={menuRef} handleClick={handleClick} />}
      <Logindialog isOpen={isOpen2} setIsOpen={setIsOpen2} />
      <MainPage isOpen={isOpen3} setIsOpen={setIsOpen3} />
    </div>
  );
}
