"use client";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import QueueView from "@/components/QueueView";
import ServiceEditor from "@/components/ServiceEditor";

export default function BarberDashboard() {
  const params = useParams();
  const barberId = params?.barberId as string;
  const barber = useQuery(api.barbers.getBarber, { barberId });
  const setOpen = useMutation(api.barbers.setOpen);

  if (!barber) return <div>جارِ التحميل...</div>;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{barber.name}</h2>
          {barber.location && <div className="text-sm opacity-70">📍 {barber.location}</div>}
        </div>
        <button
          className="border rounded p-2"
          onClick={() => setOpen({ barberId, isOpen: !barber.isOpen })}
        >
          {barber.isOpen ? "إغلاق المحل" : "فتح المحل"}
        </button>
      </div>

      <ServiceEditor barberId={barberId} />
      <div className="grid gap-2">
        <h3 className="font-bold">قائمة الانتظار</h3>
        <QueueView barberId={barberId} />
      </div>
    </div>
  );
}
