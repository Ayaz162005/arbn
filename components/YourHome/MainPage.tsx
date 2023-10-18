"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import ChooseCategory from "./ChooseCategory";
import Button from "./Button";
import ChooseLocation from "./ChooseLocation";
import { useForm } from "react-hook-form";
import SomeInformation from "./SomeInformation";
import ImageChoose from "./ImageChoose";
import Describe from "./Describe";
import Price from "./Price";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MyModal({ isOpen, setIsOpen }: Props) {
  const [stage, setStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState, setValue, reset } = useForm(
    {
      defaultValues: {
        category: "",
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: "",
        price: 1,
        title: "",
        description: "",
      },
    }
  );

  const category = watch("category");
  const imageSrc = watch("imageSrc");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const title = watch("title");
  const description = watch("description");
  const bathroomCount = watch("bathroomCount");
  const price = watch("price");
  const { errors } = formState;
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const router = useRouter();
  const onSubmit = (data: any) => {
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listining Created");
        router.refresh();
        reset();
        setStage(0);
        setIsOpen(false);
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="fixed  flex items-center justify-center"></div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <button className="absolute" onClick={closeModal}>
                    X
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center pb-4 border-b-2"
                  >
                    Arbn your home
                  </Dialog.Title>
                  {stage == 0 && (
                    <ChooseCategory setValue={setValue} category={category} />
                  )}
                  {stage == 1 && (
                    <ChooseLocation setValue={setValue} location={location} />
                  )}
                  {stage == 2 && (
                    <SomeInformation
                      setValue={setValue}
                      guestCount={guestCount}
                      roomCount={roomCount}
                      bathroomCount={bathroomCount}
                    />
                  )}
                  {stage == 3 && (
                    <ImageChoose value={imageSrc} setValue={setValue} />
                  )}
                  {stage == 4 && (
                    <Describe
                      setValue={setValue}
                      title={title}
                      description={description}
                    />
                  )}
                  {stage == 5 && <Price price={price} setValue={setValue} />}
                  <Button
                    setStage={setStage}
                    stage={stage}
                    onSubmit={handleSubmit(onSubmit)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
