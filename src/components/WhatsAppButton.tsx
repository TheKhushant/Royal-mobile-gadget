import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ message = "Hi! I'm interested in your products." }: { message?: string }) {
  const href = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle 
        size={28} 
        className="group-active:rotate-12 transition-transform" 
      />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
      </div>
    </a>
  );
}