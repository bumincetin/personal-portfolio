"use client";
import { createContext } from "react";
import type { Locale } from "@/lib/translations";
export const OptimizerLocale = createContext<Locale>("en");
