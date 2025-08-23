"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function BarberCard({ b }: { b: any }) {
  const waiting = useQuery(api.queue.waitingCount, { barberId: b._id });
  return (
    <Link
      href={`/barber/${b._id}`}
      className="border rounded-xl p-4 bg-white shadow grid gap-1"
    >
      <div className="font-bold">{b.name}</div>
      {b.location && <div className="text-sm opacity-80">📍 {b.location}</div>}
      <div className="text-sm">الحالة: {b.isOpen ? "مفتوح" : "مغلق"}</div>
      <div className="text-sm">المنتظرون: {waiting ?? 0}</div>
    </Link>
  );
}
