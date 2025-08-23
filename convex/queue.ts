import { mutation, query } from "convex/server";

export const getQueue = query(({ db }, { barberId }: { barberId: string }) => {
  return db.table("queue").filter(q => q.barberId === barberId).sort("createdAt").collect();
});

export const addCustomer = mutation(
  ({ db }, { barberId, customerName, serviceId }: { barberId: string; customerName: string; serviceId?: string }) => {
    return db.table("queue").insert({
      barberId,
      customerName,
      serviceId: serviceId || null,
      status: "waiting",
      createdAt: Date.now(),
    });
  }
);

export const finishCustomer = mutation(({ db }, { itemId }: { itemId: string }) => {
  return db.table("queue").update(itemId, { status: "done" });
});

export const removeItem = mutation(({ db }, { itemId }: { itemId: string }) => {
  return db.table("queue").delete(itemId);
});

export const waitingCount = query(({ db }, { barberId }: { barberId: string }) => {
  return db.table("queue").filter(q => q.barberId === barberId && q.status === "waiting").count();
});
