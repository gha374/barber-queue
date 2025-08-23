"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BarberCard from "@/components/BarberCard";

export default function FindBarberPage() {
  const barbers = useQuery(api.barbers.listBarbers) || [];
  return (
    <div className="grid gap-3">
      <h2 className="text-xl font-bold">اختر حلاقًا</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {barbers.map((b) => (
          <BarberCard key={b._id} b={b} />
        ))}
      </div>
    </div>
  );
}
