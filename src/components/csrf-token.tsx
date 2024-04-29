"use client";

import axios from "@/lib/axios";
import { useEffect, useRef } from "react";

const CSRFToken = () => {
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      void axios.get("/sanctum/csrf-cookie");

      fetched.current = true;
    }
  }, []);

  return null;
};

export default CSRFToken;
