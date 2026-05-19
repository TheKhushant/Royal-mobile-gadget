import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-gradient-gold">Royal Mobile Accessories</div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Nagpur's most trusted destination for premium mobile accessories, gadgets, toys & gifts.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <I size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
            <li><Link to="/gifts" className="hover:text-primary">Gift Store</Link></li>
            <li><Link to="/custom-order" className="hover:text-primary">Custom Order</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Visit Us</h4>
          <p className="text-sm text-muted-foreground flex gap-2"><MapPin size={16} className="mt-0.5 text-primary shrink-0" /> Gurudev Nagar, Opposite Petrol Pump, Nagpur</p>
          <p className="text-sm text-muted-foreground flex gap-2 mt-2"><Phone size={16} className="text-primary" /> +91 98765 43210</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Get exclusive festival deals.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" className="flex-1 bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-gold" />
            <button className="bg-gradient-gold text-primary-foreground px-4 rounded-md text-sm font-semibold">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Royal Mobile Accessories, Nagpur. All rights reserved.
      </div>
    </footer>
  );
}
