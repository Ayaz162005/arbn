import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";

export default function Button({
  stage,
  setStage,
  onSubmit,
}: {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  onSubmit: () => void;
}) {
  function handleNext() {
    setStage((i) => i + 1);
  }
  function handlePrew() {
    setStage((i) => i - 1);
  }
  return (
    <div className="flex gap-4">
      {stage > 0 && (
        <button
          className="w-full py-4 bg-slate-500 rounded-xl mt-8 text-white cursor-pointer mb-4"
          onClick={handlePrew}
        >
          Prew
        </button>
      )}
      {stage < 5 && (
        <button
          className="w-full py-4 bg-red-600 rounded-xl mt-8 text-white cursor-pointer mb-4"
          onClick={handleNext}
        >
          Next
        </button>
      )}
      {stage == 5 && (
        <button
          className="w-full py-4 bg-red-600 rounded-xl mt-8 text-white cursor-pointer mb-4"
          onClick={onSubmit}
        >
          Create
        </button>
      )}
    </div>
  );
}
