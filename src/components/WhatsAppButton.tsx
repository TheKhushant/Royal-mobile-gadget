import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ message = "Hi! I'm interested in your products." }: { message?: string }) {
  const href = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white rounded-full p-3.5 shadow-royal hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
