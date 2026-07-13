import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 180 }}
      whileHover={{ scale: 1.06 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[oklch(0.62_0.18_150)] text-white px-5 py-3.5 shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-gold)] transition-shadow"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
    </motion.a>
  );
}
