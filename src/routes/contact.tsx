import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [{ title: "Contact — Royal Mobile Accessories, Nagpur" }] }),
});

function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Get in touch</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-2">Visit Our <span className="text-gradient-gold">Royal Store</span></h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Have a question or special request? Drop by our store or message us — we'd love to help.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { I: MapPin, t: "Address", d: "Royal Mobile Accessories, Gurudev Nagar, Opposite Petrol Pump, Nagpur, Maharashtra" },
            { I: Phone, t: "Phone", d: "+91 98765 43210" },
            { I: Mail, t: "Email", d: "hello@royalmobilenagpur.in" },
            { I: Clock, t: "Open Hours", d: "Mon – Sun · 10:00 AM – 9:30 PM" },
          ].map(({ I, t, d }) => (
            <div key={t} className="royal-border rounded-xl p-5 flex gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-gold grid place-items-center text-primary-foreground shrink-0"><I size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-primary">{t}</div>
                <div className="text-sm mt-0.5">{d}</div>
              </div>
            </div>
          ))}

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white py-3 rounded-md text-center font-medium inline-flex items-center justify-center gap-2"><MessageCircle size={16} /> WhatsApp Us</a>
            <a href="tel:+919876543210" className="bg-gradient-gold text-primary-foreground py-3 rounded-md text-center font-semibold inline-flex items-center justify-center gap-2"><Phone size={16} /> Call Now</a>
          </div>
          <div className="flex gap-3 pt-2">
            <a href="#" className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram size={16} /></a>
            <a href="#" className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook size={16} /></a>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back soon."); (e.target as HTMLFormElement).reset(); }} className="royal-border rounded-xl p-6 space-y-4">
          <h3 className="font-display text-2xl">Send a Message</h3>
          <input required placeholder="Name" maxLength={80} className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
          <input required type="email" placeholder="Email" maxLength={120} className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
          <input placeholder="Phone" maxLength={15} className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
          <textarea required rows={5} placeholder="Your message" maxLength={1000} className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
          <button className="w-full bg-gradient-gold text-primary-foreground font-semibold py-3 rounded-md shadow-gold">Send Message</button>
        </form>
      </div>

      <div className="mt-12 royal-border rounded-2xl overflow-hidden aspect-[16/8]">
        <iframe
          title="Royal Mobile Accessories on Map"
          src="https://www.google.com/maps?q=Gurudev+Nagar+Nagpur&output=embed"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
