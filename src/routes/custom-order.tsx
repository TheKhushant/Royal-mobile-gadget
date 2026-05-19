import { createFileRoute } from "@tanstack/react-router";
import { Upload, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/custom-order")({
  component: CustomOrder,
  head: () => ({ meta: [{ title: "Custom Order — Royal Mobile Accessories" }] }),
});

function CustomOrder() {
  const [file, setFile] = useState<File | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const req = (fd.get("request") as string)?.trim();
    const budget = (fd.get("budget") as string)?.trim();
    if (!name || !phone || !req) { toast.error("Please fill name, phone and request"); return; }
    const text = `Custom Order Request%0A%0AName: ${name}%0APhone: ${phone}%0ABudget: ${budget}%0A%0ARequest: ${req}${file ? `%0A(Image attached: ${file.name})` : ""}`;
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your request");
    form.reset();
    setFile(null);
  };
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.3em]"><Sparkles size={14} /> Anything Royal</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-2">Custom Order Request</h1>
        <p className="text-muted-foreground mt-3">Can't find what you're looking for? Tell us — we'll source it for you.</p>
      </div>

      <form onSubmit={onSubmit} className="royal-border rounded-2xl p-6 sm:p-8 space-y-5 bg-card/40">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-primary">Your Name</label>
            <input name="name" required maxLength={80} className="mt-1.5 w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 ring-gold" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-primary">Phone</label>
            <input name="phone" required maxLength={15} className="mt-1.5 w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 ring-gold" />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-primary">Budget (₹)</label>
          <input name="budget" maxLength={20} placeholder="e.g. 500 – 2000" className="mt-1.5 w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 ring-gold" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-primary">Describe your request</label>
          <textarea name="request" required rows={5} maxLength={1000} placeholder="Product name, brand, color, quantity, occasion..." className="mt-1.5 w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 ring-gold" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-primary">Reference Image (optional)</label>
          <label className="mt-1.5 flex items-center gap-3 border border-dashed border-border rounded-md px-4 py-6 cursor-pointer hover:border-gold transition-colors">
            <Upload size={18} className="text-primary" />
            <span className="text-sm text-muted-foreground">{file ? file.name : "Click to upload image"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
        </div>
        <button type="submit" className="w-full bg-gradient-gold text-primary-foreground font-semibold py-3 rounded-md shadow-gold">
          Send via WhatsApp
        </button>
      </form>
    </section>
  );
}
