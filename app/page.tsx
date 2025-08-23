"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<"barber" | "customer" | null>(null);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          className="rounded-2xl shadow p-6 border"
          onClick={() => setRole("barber")}
        >
          أنا حلاق
        </button>
        <button
          className="rounded-2xl shadow p-6 border"
          onClick={() => router.push("/find")}
        >
          أنا أبحث عن حلاق
        </button>
      </div>
    </div>
  );
}
