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

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "ROYAL10") {
      setDiscount(Math.round(total * 0.1));
      toast.success("✅ Coupon applied — 10% off!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="mx-auto w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center text-6xl mb-6">
          🛍️
        </div>
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Discover premium mobile accessories &amp; gifts
        </p>
        <Link
          to="/shop"
          className="inline-flex mt-8 bg-gradient-to-r from-rose-600 to-rose-700 text-white px-8 py-3.5 rounded-2xl font-semibold hover:shadow-lg hover:shadow-rose-500/30 transition-all"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        {/* Cart Items */}
        <div className="space-y-6">
          {items.map((i) => (
            <div
              key={i.product.id}
              className="royal-border bg-white rounded-3xl p-6 flex gap-6"
            >
              <img
                src={i.product.image}
                alt={i.product.name}
                className="w-28 h-28 rounded-2xl object-cover border"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-widest text-zinc-500">
                  {i.product.category}
                </div>
                <h3 className="font-semibold text-lg leading-tight mt-1 line-clamp-2">
                  {i.product.name}
                </h3>
                <div className="text-rose-600 font-semibold mt-2 text-xl">
                  ₹{i.product.price}
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-zinc-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setQty(i.product.id, i.qty - 1)}
                      className="px-4 py-2.5 hover:bg-zinc-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-6 font-medium">{i.qty}</span>
                    <button
                      onClick={() => setQty(i.product.id, i.qty + 1)}
                      className="px-4 py-2.5 hover:bg-zinc-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => remove(i.product.id)}
                    className="text-zinc-500 hover:text-rose-600 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>

              <div className="text-right font-semibold text-xl self-center">
                ₹{i.product.price * i.qty}
              </div>
            </div>
          ))}

          <button
            onClick={clear}
            className="text-sm text-zinc-500 hover:text-rose-600 transition-colors"
          >
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <aside className="royal-border bg-white rounded-3xl p-8 h-fit lg:sticky lg:top-24">
          <h3 className="font-display text-2xl mb-6">Order Summary</h3>

          <div className="flex gap-3">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon (ROYAL10)"
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={applyCoupon}
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white px-6 rounded-2xl font-semibold hover:brightness-105 transition"
            >
              Apply
            </button>
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600">Subtotal</span>
              <span>₹{total}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount (10%)</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between pt-4 border-t text-xl font-display">
              <span>Total</span>
              <span className="text-gradient-gold">₹{grand}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-8 w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-rose-500/30 transition-all active:scale-[0.985]"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <p className="text-center text-xs text-zinc-500 mt-4">
            Secure payment via UPI • Cards • COD Available
          </p>
        </aside>
      </div>
    </section>
  );
}