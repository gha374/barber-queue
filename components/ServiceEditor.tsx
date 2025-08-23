"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ServiceEditor({ barberId }: { barberId: string }) {
  const services = useQuery(api.services.listServices, { barberId }) || [];
  const add = useMutation(api.services.addService);
  const update = useMutation(api.services.updateService);
  const del = useMutation(api.services.deleteService);

  return (
    <div className="grid gap-2">
      <h3 className="font-bold">الخدمات</h3>
      <form
        className="grid gap-2 sm:grid-cols-4 items-end"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          await add({
            barberId,
            name: String(fd.get("name")),
            price: Number(fd.get("price")),
            duration: Number(fd.get("duration")),
          });
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <input name="name" placeholder="اسم الخدمة" className="border rounded p-2" required />
        <input name="price" placeholder="السعر" type="number" className="border rounded p-2" required />
        <input name="duration" placeholder="المدة بالدقائق" type="number" className="border rounded p-2" required />
        <button className="border rounded p-2">إضافة</button>
      </form>

      <div className="grid gap-2">
        {services.map((s) => (
          <div key={s._id} className="flex items-center gap-2 border rounded p-2 bg-white">
            <input
              defaultValue={s.name}
              className="border rounded p-1 flex-1"
              onBlur={(e)
