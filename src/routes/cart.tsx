import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({ meta: [{ title: "Cart — Royal Mobile Accessories" }] }),
});

function Cart() {
  const { items, remove, setQty, total, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = total > 499 || total === 0 ? 0 : 49;
  const grand = total - discount + shipping;

  const apply = () => {
    if (coupon.trim().toUpperCase() === "ROYAL10") {
      setDiscount(Math.round(total * 0.1));
      toast.success("Coupon applied — 10% off!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon");
    }
  };

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="font-display text-3xl mt-4">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Discover our royal collection of accessories & gifts.</p>
        <Link to="/shop" className="inline-flex mt-6 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.product.id} className="royal-border rounded-xl p-4 flex gap-4">
              <img src={i.product.image} alt={i.product.name} className="w-24 h-24 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{i.product.category}</div>
                <div className="font-medium truncate">{i.product.name}</div>
                <div className="text-primary font-semibold mt-1">₹{i.product.price}</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-md">
                    <button onClick={() => setQty(i.product.id, i.qty - 1)} className="px-2 py-1 hover:bg-secondary"><Minus size={14} /></button>
                    <span className="px-3 text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.qty + 1)} className="px-2 py-1 hover:bg-secondary"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-accent text-sm inline-flex items-center gap-1">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right font-semibold">₹{i.product.price * i.qty}</div>
            </div>
          ))}
          <button onClick={clear} className="text-sm text-muted-foreground hover:text-accent">Clear cart</button>
        </div>

        <aside className="royal-border rounded-xl p-6 h-fit lg:sticky lg:top-20 space-y-4">
          <h3 className="font-display text-xl">Order Summary</h3>
          <div className="flex gap-2">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (try ROYAL10)" className="flex-1 bg-input border border-border rounded-md px-3 py-2 text-sm" />
            <button onClick={apply} className="bg-gradient-gold text-primary-foreground text-sm px-4 rounded-md font-semibold">Apply</button>
          </div>
          <div className="text-sm space-y-2 pt-2 border-t border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{total}</span></div>
            {discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-₹{discount}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
            <div className="flex justify-between pt-2 border-t border-border font-display text-xl">
              <span>Total</span><span className="text-gradient-gold">₹{grand}</span>
            </div>
          </div>
          <Link to="/checkout" className="w-full bg-gradient-gold text-primary-foreground font-semibold py-3 rounded-md text-center flex items-center justify-center gap-2 shadow-gold">
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          <div className="text-xs text-muted-foreground text-center">UPI · Razorpay · COD available</div>
        </aside>
      </div>
    </section>
  );
}
