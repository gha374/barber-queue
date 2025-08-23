import { mutation, query } from "convex/server";

export const listBarbers = query(({ db }) => {
  return db.table("barbers").collect();
});

export const getBarber = query(({ db }, { barberId }: { barberId: string }) => {
  return db.table("barbers").get(barberId);
});

export const setOpen = mutation(
  ({ db }, { barberId, isOpen }: { barberId: string; isOpen: boolean }) => {
    return db.table("barbers").update(barberId, { isOpen });
  }
);
