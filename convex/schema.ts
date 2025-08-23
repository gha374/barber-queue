import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  barbers: defineTable({
    name: "string",
    location: "string",
    isOpen: "boolean",
    createdAt: "number",
  }),
  services: defineTable({
    barberId: "string",
    name: "string",
    price: "number",
    duration: "number",
  }),
  queue: defineTable({
    barberId: "string",
    customerName: "string",
    serviceId: "string?",
    status: "string", // waiting | done
    createdAt: "number",
  }),
});
