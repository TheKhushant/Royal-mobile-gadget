import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — Royal Mobile Accessories" }] }),
});

function Checkout() {
  const { items, total, clear } = useCart();
  const [pay, setPay] = useState("cod");
  const [done, setDone] = useState(false);

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
    setDone(true);
    clear();
  };

  if (done) {
    return (
      <section className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto text-primary" size={64} />
        <h1 className="font-display text-3xl mt-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-2">Our team will WhatsApp you shortly to confirm your order.</p>
        <Link to="/" className="inline-flex mt-6 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold">Back to Home</Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to checkout</h1>
        <Link to="/shop" className="inline-flex mt-6 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold">Shop Now</Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl mb-8">Checkout</h1>
      <form onSubmit={place} className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <div className="royal-border rounded-xl p-6">
            <h3 className="font-display text-xl mb-4">Delivery Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" maxLength={80} className="bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
              <input required placeholder="Phone" maxLength={15} className="bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
              <input required placeholder="Email" type="email" maxLength={120} className="bg-input border border-border rounded-md px-3 py-2.5 text-sm sm:col-span-2" />
              <input required placeholder="Address" maxLength={200} className="bg-input border border-border rounded-md px-3 py-2.5 text-sm sm:col-span-2" />
              <input required placeholder="City" maxLength={50} defaultValue="Nagpur" className="bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
              <input required placeholder="Pincode" maxLength={6} className="bg-input border border-border rounded-md px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="royal-border rounded-xl p-6">
            <h3 className="font-display text-xl mb-4">Payment Method</h3>
            <div className="space-y-2">
              {[
                { id: "cod", label: "Cash on Delivery", d: "Pay when you receive" },
                { id: "upi", label: "UPI", d: "Google Pay, PhonePe, Paytm" },
                { id: "razorpay", label: "Razorpay (Card / Netbanking)", d: "Secure online payment" },
              ].map((o) => (
                <label key={o.id} className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${pay === o.id ? "border-gold bg-secondary/50" : "border-border"}`}>
                  <input type="radio" name="pay" value={o.id} checked={pay === o.id} onChange={(e) => setPay(e.target.value)} className="mt-1 accent-[var(--gold)]" />
                  <div>
                    <div className="font-medium">{o.label}</div>
                    <div className="text-xs text-muted-foreground">{o.d}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="royal-border rounded-xl p-6 h-fit space-y-3">
          <h3 className="font-display text-xl">Your Order</h3>
          <div className="text-sm space-y-2">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between"><span className="truncate pr-2">{i.product.name} × {i.qty}</span><span>₹{i.product.price * i.qty}</span></div>
            ))}
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-display text-xl">
            <span>Total</span><span className="text-gradient-gold">₹{total}</span>
          </div>
          <button type="submit" className="w-full bg-gradient-gold text-primary-foreground font-semibold py-3 rounded-md shadow-gold">Place Order</button>
        </aside>
      </form>
    </section>
  );
}
