"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function QueueView({ barberId }: { barberId: string }) {
  const queue = useQuery(api.queue.getQueue, { barberId, status: undefined }) || [];
  const add = useMutation(api.queue.addCustomer);
  const finish = useMutation(api.queue.finishCustomer);
  const remove = useMutation(api.queue.removeItem);

  return (
    <div className="grid gap-3">
      <form
        className="grid gap-2 sm:grid-cols-4 items-end"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          await add({
            barberId,
            customerName: String(fd.get("name")),
            serviceId: (fd.get("serviceId") as string) || undefined,
          });
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <input
          name="name"
          placeholder="اسم الزبون أو Walk-in"
          className="border rounded p-2"
          required
        />
        <input name="serviceId" placeholder="ID الخدمة (اختياري)" className="border rounded p-2" />
        <button className="border rounded p-2">إضافة زبون</button>
      </form>

      <ul className="grid gap-2">
        {queue.map((c, idx) => (
          <li key={c._id} className="flex items-center justify-between border rounded p-2 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">#{idx + 1}</span>
              <span className="font-medium">{c.customerName}</span>
              {c.status === "done" && <span className="text-xs">(منتهي)</span>}
            </div>
            <div className="flex items-center gap-2">
              {c.status !== "done" && (
                <button className="text-sm" onClick={() => finish({ itemId: c._id })}>
                  تم القص
                </button>
              )}
              <button className="text-sm" onClick={() => remove({ itemId: c._id })}>
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
