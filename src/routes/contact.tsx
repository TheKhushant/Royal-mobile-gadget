import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [{ title: "Contact — Royal Mobile Accessories, Nagpur" }] }),
});

function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-xs uppercase tracking-[2px] text-rose-600">Get In Touch</div>
        <h1 className="font-display text-5xl sm:text-6xl mt-3">
          Visit Our <span className="text-gradient-gold">Royal Store</span>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
          Have questions? We’d love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          {[
            { 
              icon: MapPin, 
              title: "Store Address", 
              detail: "Gurudev Nagar, Opposite Petrol Pump, Nagpur, Maharashtra 440009" 
            },
            { 
              icon: Phone, 
              title: "Phone", 
              detail: "+91 98765 43210" 
            },
            { 
              icon: Mail, 
              title: "Email", 
              detail: "hello@royalmobilenagpur.in" 
            },
            { 
              icon: Clock, 
              title: "Store Hours", 
              detail: "Monday – Sunday | 10:00 AM – 9:30 PM" 
            },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="royal-border bg-white rounded-3xl p-7 flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <div className="uppercase text-xs tracking-widest text-rose-600 font-medium">{title}</div>
                <div className="mt-1.5 leading-relaxed text-zinc-700">{detail}</div>
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:brightness-110 transition-all"
            >
              <MessageCircle size={20} /> WhatsApp Us
            </a>
            <a
              href="tel:+919876543210"
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all"
            >
              <Phone size={20} /> Call Now
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-4 pt-2">
            <a href="#" className="p-4 bg-zinc-100 hover:bg-zinc-200 rounded-2xl transition-colors"><Instagram size={22} /></a>
            <a href="#" className="p-4 bg-zinc-100 hover:bg-zinc-200 rounded-2xl transition-colors"><Facebook size={22} /></a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="royal-border bg-white rounded-3xl p-8">
          <h3 className="font-display text-3xl mb-7">Send us a Message</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message received! We'll reply soon.");
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-5"
          >
            <input required placeholder="Your Name" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5" />
            <input required type="email" placeholder="Email Address" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5" />
            <input placeholder="Phone (optional)" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5" />
            <textarea required rows={6} placeholder="How can we help you?" className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl px-5 py-4 resize-y" />
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold py-4 rounded-2xl hover:shadow-xl transition-all mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="mt-16 royal-border bg-white rounded-3xl overflow-hidden h-[420px]">
        <iframe
          title="Royal Mobile Accessories Location"
          src="https://www.google.com/maps?q=Gurudev+Nagar+Nagpur&output=embed"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}