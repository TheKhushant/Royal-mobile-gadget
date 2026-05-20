import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-6">
          <div>
            <div className="font-display text-3xl tracking-tight bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Royal Mobile Accessories
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs">
              Nagpur's most trusted destination for premium mobile accessories, gadgets, toys &amp; gifts.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="group p-3 rounded-2xl bg-zinc-100 hover:bg-gradient-to-br hover:from-amber-500 hover:to-yellow-600 transition-all duration-300 hover:shadow-md"
                aria-label={`Visit our ${Icon.name}`}
              >
                <Icon
                  size={18}
                  className="text-zinc-600 group-hover:text-white transition-colors"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-xs font-semibold tracking-[1px] text-rose-600 uppercase mb-5">Shop</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/shop"
                className="text-muted-foreground hover:text-rose-600 transition-colors inline-flex items-center gap-1.5 group"
              >
                All Products
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="text-muted-foreground hover:text-rose-600 transition-colors inline-flex items-center gap-1.5 group"
              >
                Categories
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
              </Link>
            </li>
            <li>
              <Link
                to="/gifts"
                className="text-muted-foreground hover:text-rose-600 transition-colors inline-flex items-center gap-1.5 group"
              >
                Gift Store
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
              </Link>
            </li>
            <li>
              <Link
                to="/custom-order"
                className="text-muted-foreground hover:text-rose-600 transition-colors inline-flex items-center gap-1.5 group"
              >
                Custom Order
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4 className="text-xs font-semibold tracking-[1px] text-rose-600 uppercase mb-5">Visit Us</h4>
          <div className="space-y-5 text-sm">
            <div className="flex gap-3 text-muted-foreground">
              <MapPin size={18} className="text-rose-600 mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                Gurudev Nagar, Opposite Petrol Pump,<br />
                Nagpur, Maharashtra
              </p>
            </div>
            <div className="flex gap-3 text-muted-foreground">
              <Phone size={18} className="text-rose-600 shrink-0" />
              <a href="tel:+919876543210" className="hover:text-rose-600 transition-colors">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold tracking-[1px] text-rose-600 uppercase mb-5">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Get early access to festival deals, new arrivals and exclusive offers.
          </p>
          
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-amber-400 rounded-2xl px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-semibold py-3.5 rounded-2xl text-sm tracking-wider transition-all duration-200 active:scale-[0.985] shadow-md shadow-rose-500/20"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-3">We respect your inbox. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-100 bg-zinc-50 py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Royal Mobile Accessories, Nagpur. All rights reserved.
        </div>
      </div>
    </footer>
  );
}