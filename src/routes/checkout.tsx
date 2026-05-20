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

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
    setDone(true);
    clear();
  };

  if (done) {
    return (
      <section className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="text-emerald-600" size={52} />
        </div>
        <h1 className="font-display text-4xl">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Thank you! Our team will WhatsApp you shortly for confirmation.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex bg-gradient-to-r from-rose-600 to-rose-700 text-white px-8 py-3.5 rounded-2xl font-semibold hover:shadow-lg transition-all"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-lg mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to checkout</h1>
        <Link
          to="/shop"
          className="mt-6 inline-flex bg-gradient-to-r from-rose-600 to-rose-700 text-white px-8 py-3.5 rounded-2xl font-semibold"
        >
          Shop Now
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl mb-10">Checkout</h1>

      <form onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_380px] gap-10">
        {/* Left Column - Details */}
        <div className="space-y-8">
          {/* Delivery Details */}
          <div className="royal-border bg-white rounded-3xl p-8">
            <h3 className="font-display text-2xl mb-6">Delivery Details</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <input required placeholder="Full Name" className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus:border-rose-300 outline-none" />
              <input required placeholder="Phone Number" maxLength={15} className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus:border-rose-300 outline-none" />
              <input required type="email" placeholder="Email Address" className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus:border-rose-300 outline-none sm:col-span-2" />
              <input required placeholder="Full Address" className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus:border-rose-300 outline-none sm:col-span-2" />
              <input required placeholder="City" defaultValue="Nagpur" className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus:border-rose-300 outline-none" />
              <input required placeholder="Pincode" maxLength={6} className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus:border-rose-300 outline-none" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="royal-border bg-white rounded-3xl p-8">
            <h3 className="font-display text-2xl mb-6">Payment Method</h3>
            <div className="space-y-3">
              {[
                { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive the order" },
                { id: "upi", label: "UPI Payment", desc: "Google Pay, PhonePe, Paytm, etc." },
                { id: "razorpay", label: "Cards / Net Banking", desc: "Powered by Razorpay" },
              ].map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${pay === option.id ? "border-rose-600 bg-rose-50" : "border-zinc-200 hover:border-zinc-300"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={pay === option.id}
                    onChange={(e) => setPay(e.target.value)}
                    className="mt-1 accent-rose-600"
                  />
                  <div>
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="royal-border bg-white rounded-3xl p-8 h-fit lg:sticky lg:top-24">
          <h3 className="font-display text-2xl mb-6">Your Order</h3>

          <div className="space-y-4 text-sm">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between">
                <span className="line-clamp-1 pr-3">
                  {i.product.name} × {i.qty}
                </span>
                <span className="font-medium">₹{i.product.price * i.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-200 my-6" />

          <div className="flex justify-between items-baseline font-display text-3xl">
            <span>Total</span>
            <span className="text-gradient-gold">₹{total}</span>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all active:scale-[0.985]"
          >
            Place Order
          </button>

          <p className="text-center text-xs text-zinc-500 mt-5">
            Secure checkout • Cash on Delivery available
          </p>
        </aside>
      </form>
    </section>
  );
}