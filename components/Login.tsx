import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import {
  FieldError,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import Input from "./Input";
import { signIn } from "next-auth/react";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setIsOpen2: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MyModal({
  isOpen,
  setIsOpen,
  email,
  setIsOpen2,
}: Props) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { register, handleSubmit, watch, formState, setValue } = useForm({
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      console.log("sdsdd");
      setIsloading(true);
      //   const res = await fetch("/api/register", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json", // Set the content type to JSON
      //     },
      //     body: JSON.stringify(data), // Stringify the JSON object
      //   });

      //   if (!res.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      // signIn("credentials", {
      //   email: email,
      //   password: data.password,
      // });
      console.log(data);
      setValue("password", "");

      setIsOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  }
  const { errors } = formState;
  function handleClose() {
    setIsOpen2(true);
    setIsOpen(false);
    setValue("password", "");
    // errors.password = "";
  }

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button className="absolute" onClick={handleClose}>
                    <IoIosArrowBack />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center pb-4 border-b-2"
                  >
                    Log in
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      register={register}
                      errors={errors}
                      setIsError={setIsError}
                      isError={isError}
                      value="password"
                      className={"mb-4 mt-2"}
                      placeholder="Password"
                      speciality={{
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be  much 8 characters",
                        },
                      }}
                    />
                    <input
                      type="submit"
                      value={`${!isLoading ? "Log in" : "..."}`}
                      disabled={isLoading}
                      className="w-full py-4 bg-red-600 rounded-xl mt-8 text-white cursor-pointer mb-4"
                      onClick={() => signIn("credentials")}
                    />
                    <a href="#" className="underline ">
                      Forgot password?
                    </a>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
