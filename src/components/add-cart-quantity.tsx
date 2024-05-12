"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";

function AddCartQuantity() {
  const [quantity, setQuantity] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex">
      <Button
        className="rounded-r-none"
        variant="secondary"
        size="icon"
        onClick={() => {
          setQuantity((prevQuantity) => {
            if (prevQuantity <= 0) {
              inputRef.current!.value = "0";
              return 0;
            } else {
              inputRef.current!.value = String(prevQuantity - 1);
              return prevQuantity - 1;
            }
          });
        }}
      >
        -
      </Button>
      <input
        type="text"
        className="w-10 rounded-md border border-input bg-background text-center outline-none md:w-20"
        ref={inputRef}
        defaultValue={1}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setQuantity(0);
            return;
          }
          const formattedValue = Number(value);
          if (isNaN(formattedValue)) {
            setQuantity(0);
            inputRef.current!.value = "";
          } else if (formattedValue >= 10) {
            setQuantity(10);
            inputRef.current!.value = "10";
          } else {
            setQuantity(formattedValue);
          }
        }}
        onBlur={(e) => {
          const value = e.target.value;
          if (value === "") inputRef.current!.value = "0";
        }}
      />
      <Button
        className="rounded-l-none"
        variant="secondary"
        size="icon"
        onClick={() => {
          setQuantity((prevQuantity) => {
            if (prevQuantity >= 10) {
              inputRef.current!.value = "10";
              return 10;
            } else {
              inputRef.current!.value = String(prevQuantity + 1);
              return prevQuantity + 1;
            }
          });
        }}
      >
        +
      </Button>
    </div>
  );
}

export default AddCartQuantity;
