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

    if (!name || !phone || !req) {
      toast.error("Please fill name, phone and request");
      return;
    }

    const text = `Custom Order Request%0A%0AName: ${name}%0APhone: ${phone}%0ABudget: ${budget}%0A%0ARequest: ${req}${file ? `%0A(Image attached: ${file.name})` : ""}`;
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your request");
    form.reset();
    setFile(null);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-600 text-xs uppercase tracking-[2px]">
          <Sparkles size={16} /> Premium Personalization
        </div>
        <h1 className="font-display text-5xl sm:text-6xl mt-3">Custom Order Request</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-md mx-auto">
          Can't find what you want? We'll source it specially for you.
        </p>
      </div>

      <form onSubmit={onSubmit} className="royal-border bg-white rounded-3xl p-8 sm:p-10 space-y-7">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-rose-600">Your Name</label>
            <input
              name="name"
              required
              maxLength={80}
              className="mt-2 w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm focus:border-rose-300 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-rose-600">Phone Number</label>
            <input
              name="phone"
              required
              maxLength={15}
              className="mt-2 w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm focus:border-rose-300 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-rose-600">Budget (₹)</label>
          <input
            name="budget"
            maxLength={20}
            placeholder="e.g. 800 – 2500"
            className="mt-2 w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm focus:border-rose-300 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-rose-600">Describe Your Request</label>
          <textarea
            name="request"
            required
            rows={5}
            maxLength={1000}
            placeholder="I need a custom gift set with wireless earbuds, power bank, and personalized packaging for a birthday..."
            className="mt-2 w-full bg-zinc-50 border border-zinc-200 rounded-3xl px-5 py-4 text-sm focus:border-rose-300 focus:outline-none resize-y transition-colors"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-rose-600">Reference Image (Optional)</label>
          <label className="mt-2 flex flex-col items-center justify-center border border-dashed border-zinc-300 hover:border-amber-400 rounded-3xl px-6 py-10 cursor-pointer transition-colors bg-zinc-50">
            <Upload size={28} className="text-rose-600" />
            <span className="text-sm text-zinc-600 mt-3">
              {file ? file.name : "Click or drag image here"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all active:scale-[0.985]"
        >
          Send Request via WhatsApp
        </button>
      </form>
    </section>
  );
}