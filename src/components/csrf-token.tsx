"use client";

import axios from "@/lib/axios";
import { useEffect, useRef } from "react";

const CSRFToken = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    void axios.get("/sanctum/csrf-cookie");
    intervalRef.current = setInterval(
      () => {
        void axios.get("/sanctum/csrf-cookie");
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return null;
};

export default CSRFToken;
