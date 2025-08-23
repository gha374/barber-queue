import { mutation, query } from "convex/server";

export const listServices = query(({ db }, { barberId }: { barberId: string }) => {
  return db.table("services").filter(s => s.barberId === barberId).collect();
});

export const addService = mutation(
  ({ db }, { barberId, name, price, duration }: { barberId: string; name: string; price: number; duration: number }) => {
    return db.table("services").insert({ barberId, name, price, duration });
  }
);

export const updateService = mutation(
  ({ db }, { serviceId, name, price, duration }: { serviceId: string; name: string; price: number; duration: number }) => {
    return db.table("services").update(serviceId, { name, price, duration });
  }
);

export const deleteService = mutation(({ db }, { serviceId }: { serviceId: string }) => {
  return db.table("services").delete(serviceId);
});
