import { z } from "zod";
import { apiUrl } from "@/lib/api";

export const COUNTRIES = [
  "United Kingdom",
  "Canada",
  "United States",
  "Australia",
  "France",
  "Other",
] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(160),
  country: z.enum(COUNTRIES),
  message: z.string().trim().min(10, "Please share a few details (min 10 chars)").max(1500),
  honeypot: z.string().max(0).optional(),
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.enum(COUNTRIES),
  packageInterest: z.string().min(1, "Please select a tour"),
  travelers: z.coerce.number().int().min(1).max(80),
  travelMonth: z.string().min(1, "Please select a month"),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

export const consultationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  country: z.enum(COUNTRIES),
  preferredTime: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(160),
  honeypot: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export type LeadKind = "contact" | "inquiry" | "consultation" | "newsletter";

type LeadPayload = Record<string, unknown>;

/**
 * Submit a website lead to the /api/lead Azure Function, which persists it
 * to Cosmos DB. Used by the Contact, Inquiry, Consultation and Newsletter
 * forms. The "Plan Your Yatra" wizard posts to /api/enquiry directly instead,
 * since it carries a richer, purpose-built payload (quote breakdown, trip
 * details, etc).
 */
export async function submitLead(kind: LeadKind, data: LeadPayload) {
  const { honeypot, ...clean } = data;

  // Silent no-op for bot honeypot submissions — the API also checks this
  // server-side, but we short-circuit here to avoid the network round trip.
  if (honeypot) {
    return;
  }

  if (!clean.email) {
    throw new Error("Email is required.");
  }

  const response = await fetch(apiUrl("/api/lead"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, ...clean }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error ?? `Lead submission failed: ${response.status}`);
  }
}
