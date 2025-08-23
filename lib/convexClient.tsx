"use client";
import { ConvexProvider } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ConvexProviderClient({ children }: { children: React.ReactNode }) {
  return <ConvexProvider api={api}>{children}</ConvexProvider>;
}
